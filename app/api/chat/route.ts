import { streamText } from "ai"
import { google } from "@ai-sdk/google"

// Permitir respuestas de streaming de hasta 30 segundos
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Usar Google Gemini con la clave de API proporcionada
    const result = streamText({
      model: google("gemini-1.5-pro", {
        apiKey: process.env.GOOGLE_API_KEY!,
      }),
      system: `Eres un asistente matemático experto. 
      Proporciona explicaciones claras y detalladas sobre conceptos matemáticos.
      Utiliza LaTeX para mostrar fórmulas matemáticas.
      Incluye ejemplos prácticos cuando sea apropiado.
      Responde en español.`,
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error en la ruta de chat:", error)
    return new Response(JSON.stringify({ error: "Error al procesar la solicitud" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
