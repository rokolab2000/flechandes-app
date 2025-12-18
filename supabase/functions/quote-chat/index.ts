import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Eres el asistente virtual de Flechandes, una plataforma de mudanzas y fletes en Chile. Tu objetivo es ayudar a los usuarios a cotizar servicios de forma conversacional y amigable.

INFORMACIÓN QUE DEBES RECOPILAR:
1. Tipo de servicio: mudanza o flete
2. Origen y destino (direcciones en Chile)
3. Tipo de vehículo necesario (furgón, camioneta, camión chico, camión mediano, camión grande)
4. Acceso en origen: ¿tiene ascensor? ¿qué piso?
5. Acceso en destino: ¿tiene ascensor? ¿qué piso?
6. Objetos especiales: piano, caja fuerte, objetos frágiles, electrodomésticos grandes
7. Cantidad de ayudantes adicionales necesarios (0-3)

TARIFAS DE REFERENCIA (CLP):
- Furgón: $35.000 base
- Camioneta: $45.000 base
- Camión chico: $70.000 base
- Camión mediano: $100.000 base
- Camión grande: $150.000 base
- Por km extra (después de 7km): $800
- Por piso sin ascensor: $5.000/piso
- Ayudante adicional: $15.000
- Piano: +$100.000
- Caja fuerte: +$80.000
- Objetos frágiles: +$10.000
- Electrodomésticos grandes: +$15.000
- Zona remota: +$10.000

INSTRUCCIONES DE COMPORTAMIENTO:
- Sé amigable y profesional, usa español chileno casual
- Haz preguntas de forma natural, no como un formulario
- Cuando detectes información, confirma lo que entendiste
- Si el usuario menciona algo pesado o difícil, pregunta detalles
- Recuerda mencionar los recargos por escaleras y objetos especiales
- Cuando tengas toda la info, genera el JSON de cotización

FORMATO DE RESPUESTA:
Cuando tengas suficiente información para cotizar, incluye al FINAL de tu mensaje un bloque JSON así:
\`\`\`quote
{
  "ready": true,
  "serviceType": "mudanza" | "flete",
  "origin": "dirección origen",
  "destination": "dirección destino", 
  "vehicleType": "furgon" | "camioneta" | "camion_chico" | "camion_mediano" | "camion_grande",
  "originAccess": { "hasElevator": boolean, "floor": number },
  "destinationAccess": { "hasElevator": boolean, "floor": number },
  "specialObjects": ["piano", "safe", "fragile", "appliances_large"],
  "helpersCount": number,
  "distanceKm": number (estimado),
  "isRemoteZone": boolean
}
\`\`\`

Si aún falta información, NO incluyas el bloque JSON. Solo responde conversacionalmente.`;

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
        return new Response(JSON.stringify({ error: "Demasiadas solicitudes. Por favor espera un momento." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Servicio temporalmente no disponible." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Error en el servicio de IA" }), {
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
