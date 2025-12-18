import { useState, useCallback } from 'react';
import { QuoteInput, calculateQuote, generateRiskTags, QuoteBreakdown, RiskTag } from '@/lib/pricingEngine';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface QuoteData {
  ready: boolean;
  serviceType: 'mudanza' | 'flete';
  origin: string;
  destination: string;
  vehicleType: string;
  originAccess: { hasElevator: boolean; floor: number };
  destinationAccess: { hasElevator: boolean; floor: number };
  specialObjects: string[];
  helpersCount: number;
  distanceKm: number;
  isRemoteZone: boolean;
}

export interface UseQuoteChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  quoteData: QuoteData | null;
  quoteBreakdown: QuoteBreakdown | null;
  riskTags: RiskTag[];
  sendMessage: (content: string) => Promise<void>;
  resetChat: () => void;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/quote-chat`;

function extractQuoteData(content: string): QuoteData | null {
  const quoteMatch = content.match(/```quote\s*([\s\S]*?)\s*```/);
  if (!quoteMatch) return null;
  
  try {
    const data = JSON.parse(quoteMatch[1]);
    if (data.ready) {
      return data as QuoteData;
    }
  } catch (e) {
    console.error('Error parsing quote data:', e);
  }
  return null;
}

function cleanMessageContent(content: string): string {
  return content.replace(/```quote\s*[\s\S]*?\s*```/g, '').trim();
}

export function useQuoteChat(): UseQuoteChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: '¡Hola! 👋 Soy tu asistente de Flechandes. Cuéntame, ¿qué necesitas mover o transportar hoy? Puedes decirme algo como "Necesito mudarme de un depto en Providencia a una casa en Las Condes" o "Quiero llevar un refrigerador".'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [quoteBreakdown, setQuoteBreakdown] = useState<QuoteBreakdown | null>(null);
  const [riskTags, setRiskTags] = useState<RiskTag[]>([]);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    let assistantContent = '';

    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && prev.length > 1 && prev[prev.length - 2].role === 'user') {
          return prev.map((m, i) => 
            i === prev.length - 1 ? { ...m, content: cleanMessageContent(assistantContent) } : m
          );
        }
        return [...prev, { role: 'assistant', content: cleanMessageContent(assistantContent) }];
      });
    };

    try {
      const allMessages = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content
      }));

      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages }),
      });

      if (!resp.ok || !resp.body) {
        throw new Error('Error al conectar con el asistente');
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (delta) updateAssistant(delta);
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Check for quote data in final content
      const extractedQuote = extractQuoteData(assistantContent);
      if (extractedQuote) {
        setQuoteData(extractedQuote);
        
        // Calculate the quote using pricing engine
        const quoteInput: QuoteInput = {
          vehicleType: extractedQuote.vehicleType as any,
          distanceKm: extractedQuote.distanceKm,
          isRemoteZone: extractedQuote.isRemoteZone,
          originAccess: extractedQuote.originAccess,
          destinationAccess: extractedQuote.destinationAccess,
          helpersCount: extractedQuote.helpersCount,
          specialObjects: extractedQuote.specialObjects as any[],
          isB2B: false,
        };
        
        const breakdown = calculateQuote(quoteInput);
        setQuoteBreakdown(breakdown);
        setRiskTags(generateRiskTags(quoteInput));
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Lo siento, hubo un error. ¿Puedes intentar de nuevo?' }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const resetChat = useCallback(() => {
    setMessages([
      {
        role: 'assistant',
        content: '¡Hola! 👋 Soy tu asistente de Flechandes. Cuéntame, ¿qué necesitas mover o transportar hoy?'
      }
    ]);
    setQuoteData(null);
    setQuoteBreakdown(null);
    setRiskTags([]);
  }, []);

  return {
    messages,
    isLoading,
    quoteData,
    quoteBreakdown,
    riskTags,
    sendMessage,
    resetChat,
  };
}
