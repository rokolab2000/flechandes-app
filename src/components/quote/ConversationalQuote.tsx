import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, RefreshCw, Loader2, Truck, CheckCircle2 } from 'lucide-react';
import { useQuoteChat } from '@/hooks/useQuoteChat';
import { formatCLP } from '@/lib/pricingEngine';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const ConversationalQuote = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const {
    messages,
    isLoading,
    quoteData,
    quoteBreakdown,
    riskTags,
    sendMessage,
    resetChat,
  } = useQuoteChat();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const message = input.trim();
    setInput('');
    await sendMessage(message);
  };

  const handleQuickAction = (text: string) => {
    setInput(text);
    inputRef.current?.focus();
  };

  const handleRequestService = () => {
    if (quoteData) {
      navigate('/customer/new-service', { 
        state: { 
          serviceType: quoteData.serviceType === 'mudanza' ? 'moving' : 'freight',
          prefilled: quoteData,
          step: 1 
        } 
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
      {/* Chat Panel */}
      <Card className="flex-1 flex flex-col shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#009EE2] to-[#DB2851] p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Asistente Flechandes</h3>
                <p className="text-sm opacity-90">Cotiza tu servicio conversando</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetChat}
              className="text-white hover:bg-white/20"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Nueva consulta
            </Button>
          </div>
        </div>

        <ScrollArea ref={scrollRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-3",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.role === 'assistant' && (
                  <div className="bg-[#009EE2]/10 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-[#009EE2]" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3",
                    message.role === 'user'
                      ? "bg-[#009EE2] text-white rounded-br-md"
                      : "bg-muted rounded-bl-md"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="bg-[#DB2851]/10 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-[#DB2851]" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="bg-[#009EE2]/10 p-2 rounded-full h-8 w-8 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-[#009EE2]" />
                </div>
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick suggestions */}
        {messages.length === 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-muted-foreground mb-2">Prueba con:</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction('Necesito mudarme de un depto en Providencia a Las Condes')}
                className="text-xs"
              >
                Mudanza de depto
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction('Quiero llevar un refrigerador de Ñuñoa a La Florida')}
                className="text-xs"
              >
                Flete electrodoméstico
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction('Tengo que mover un piano al 4to piso sin ascensor')}
                className="text-xs"
              >
                Piano sin ascensor
              </Button>
            </div>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="bg-[#009EE2] hover:bg-[#007bb3]"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>

      {/* Quote Result Panel */}
      <Card className={cn(
        "w-full lg:w-96 transition-all duration-300",
        quoteBreakdown ? "opacity-100" : "opacity-50"
      )}>
        <div className="bg-gradient-to-r from-[#DB2851] to-[#009EE2] p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Tu Cotización</h3>
              <p className="text-sm opacity-90">
                {quoteBreakdown ? 'Precio estimado' : 'Pendiente de información'}
              </p>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          {quoteBreakdown && quoteData ? (
            <div className="space-y-4">
              {/* Risk Tags */}
              {riskTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {riskTags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant={tag.severity === 'high' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {tag.icon} {tag.label}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Price breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base vehículo</span>
                  <span>{formatCLP(quoteBreakdown.baseVehicle)}</span>
                </div>
                {quoteBreakdown.distanceCharge > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Distancia extra</span>
                    <span>{formatCLP(quoteBreakdown.distanceCharge)}</span>
                  </div>
                )}
                {quoteBreakdown.stairsOrigin > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Escaleras origen</span>
                    <span>{formatCLP(quoteBreakdown.stairsOrigin)}</span>
                  </div>
                )}
                {quoteBreakdown.stairsDestination > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Escaleras destino</span>
                    <span>{formatCLP(quoteBreakdown.stairsDestination)}</span>
                  </div>
                )}
                {quoteBreakdown.helpersCharge > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ayudantes</span>
                    <span>{formatCLP(quoteBreakdown.helpersCharge)}</span>
                  </div>
                )}
                {quoteBreakdown.specialObjectsCharge > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Objetos especiales</span>
                    <span>{formatCLP(quoteBreakdown.specialObjectsCharge)}</span>
                  </div>
                )}
                {quoteBreakdown.remoteZoneCharge > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Zona remota</span>
                    <span>{formatCLP(quoteBreakdown.remoteZoneCharge)}</span>
                  </div>
                )}
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-2xl text-[#009EE2]">
                    {formatCLP(quoteBreakdown.total)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  IVA incluido ({formatCLP(quoteBreakdown.ivaIncluded)})
                </p>
              </div>

              {/* Helper earnings */}
              {quoteBreakdown.helperEarnings > 0 && (
                <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3">
                  <p className="text-xs text-green-700 dark:text-green-400">
                    💪 Ganancia estimada peoneta: {formatCLP(quoteBreakdown.helperEarnings)}
                  </p>
                </div>
              )}

              {/* Service details */}
              <div className="bg-muted/50 rounded-lg p-3 text-xs space-y-1">
                <p><strong>Servicio:</strong> {quoteData.serviceType === 'mudanza' ? 'Mudanza' : 'Flete'}</p>
                <p><strong>Origen:</strong> {quoteData.origin}</p>
                <p><strong>Destino:</strong> {quoteData.destination}</p>
              </div>

              <Button
                onClick={handleRequestService}
                className="w-full bg-gradient-to-r from-[#009EE2] to-[#DB2851] hover:opacity-90"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Solicitar Servicio
              </Button>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Truck className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">
                Conversa con el asistente para obtener tu cotización personalizada
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationalQuote;
