import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Eres un asistente experto de Flechandes, una plataforma de mudanzas y fletes en Chile. Tu rol es ayudar a los usuarios a cotizar servicios de manera conversacional.

INFORMACIÓN DE PRECIOS:
- Base Furgón: $35.000 CLP
- Base Camioneta: $45.000 CLP  
- Base Camión Chico: $55.000 CLP
- Base Camión Mediano: $70.000 CLP
- Base Camión Grande: $90.000 CLP

RECARGOS:
- Distancia extra (+7km): $800/km adicional
- Zona remota (Colina, Lampa, Buin, Paine, Pirque, Til Til): +$4.000 a $10.000
- Escaleras sin ascensor: +$5.000 por piso
- Ayudante/Peoneta adicional: +$15.000 a $20.000 por persona
- Objetos especiales (piano, caja fuerte): +$100.000
- Tiempo de espera (después de 10 min): $2.500 cada 15 minutos

SERVICIOS:
1. MUDANZAS: Servicio integral con personal, embalaje opcional, seguro incluido
2. FLETES: Transporte de carga, diferentes tamaños de vehículos

INSTRUCCIONES:
- Sé amable y profesional
- Haz preguntas para entender las necesidades del usuario
- Proporciona estimaciones de precio basadas en la información recopilada
- Si falta información, pregunta: origen, destino, tipo de carga, si hay escaleras, si necesitan ayudantes
- Siempre menciona que los precios son estimados y pueden variar
- Usa formato de moneda chilena (CLP con punto como separador de miles)
- Responde en español de Chile`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Límite de solicitudes excedido. Por favor, intenta de nuevo en unos momentos." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Se requiere agregar créditos para continuar usando el chat." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Error en el servicio de chat" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Quote chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Error desconocido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
