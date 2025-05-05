import { streamText } from "ai"
import { google } from "@ai-sdk/google"

// Permitir respuestas de streaming de hasta 30 segundos
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { problem, topic } = await req.json()

    // Usar Google Gemini con la clave de API proporcionada
    const result = streamText({
      model: google("gemini-1.5-pro", {
        apiKey: process.env.GOOGLE_API_KEY!,
      }),
      system: `Eres un solucionador de problemas matemáticos experto.
      Proporciona soluciones paso a paso detalladas para problemas matemáticos.
      Utiliza LaTeX para mostrar fórmulas matemáticas.
      Explica cada paso con claridad.
      Organiza tu respuesta con encabezados Markdown.
      Responde en español.`,
      prompt: `Resuelve el siguiente problema de ${topic}: ${problem}
      
      Proporciona una solución paso a paso detallada, explicando cada paso del proceso.
      Utiliza formato Markdown con encabezados para organizar la solución.
      Usa LaTeX para todas las fórmulas matemáticas.`,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error en la ruta de solución:", error)
    return new Response(JSON.stringify({ error: "Error al procesar la solicitud" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
