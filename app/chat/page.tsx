"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Loader2, Send, Bot, User } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import MathSolution from "@/components/math-solution"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "¡Hola! Soy tu asistente matemático. Puedes preguntarme sobre conceptos matemáticos, pedir ejemplos o solicitar explicaciones sobre temas específicos. ¿En qué puedo ayudarte hoy?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Preparar los mensajes para la API
      const apiMessages = messages.concat(userMessage).map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      // Llamada real a la API de Gemini
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      // Procesar la respuesta de streaming
      const reader = response.body?.getReader()
      if (!reader) throw new Error("No se pudo leer la respuesta")

      let assistantResponse = ""
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        // Decodificar y procesar los chunks
        const chunk = decoder.decode(value)
        try {
          // Cada línea puede ser un evento SSE
          const lines = chunk.split("\n").filter((line) => line.trim() !== "")

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6)
              if (data === "[DONE]") continue

              try {
                const parsed = JSON.parse(data)
                if (parsed.type === "text-delta" && parsed.text) {
                  assistantResponse += parsed.text

                  // Actualizar el mensaje del asistente en tiempo real
                  setMessages((prev) => {
                    const newMessages = [...prev]
                    const lastMessage = newMessages[newMessages.length - 1]

                    if (lastMessage && lastMessage.role === "assistant" && lastMessage.id === "streaming") {
                      lastMessage.content = assistantResponse
                      return newMessages
                    } else {
                      return [
                        ...prev,
                        {
                          id: "streaming",
                          role: "assistant",
                          content: assistantResponse,
                        },
                      ]
                    }
                  })
                }
              } catch (e) {
                console.error("Error parsing JSON:", e)
              }
            }
          }
        } catch (e) {
          console.error("Error processing chunk:", e)
        }
      }

      // Finalizar el mensaje con un ID permanente
      setMessages((prev) => {
        const newMessages = [...prev]
        const lastMessage = newMessages[newMessages.length - 1]

        if (lastMessage && lastMessage.role === "assistant" && lastMessage.id === "streaming") {
          lastMessage.id = Date.now().toString()
          return newMessages
        }

        return prev
      })
    } catch (error) {
      console.error("Error al enviar mensaje:", error)

      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Lo siento, ocurrió un error al procesar tu mensaje. Por favor, intenta de nuevo.",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Chatbot Matemático</h1>

      <Card className="h-[calc(100vh-250px)] flex flex-col">
        <CardContent className="flex-1 p-0 flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`flex-shrink-0 ${message.role === "user" ? "ml-3" : "mr-3"}`}>
                      <Avatar>
                        {message.role === "user" ? <User className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
                      </Avatar>
                    </div>
                    <div
                      className={`rounded-lg p-4 ${
                        message.role === "user"
                          ? "bg-violet-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <MathSolution solution={message.content} />
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && !messages.some((m) => m.id === "streaming") && (
                <div className="flex justify-start">
                  <div className="flex flex-row">
                    <div className="flex-shrink-0 mr-3">
                      <Avatar>
                        <Bot className="h-6 w-6" />
                      </Avatar>
                    </div>
                    <div className="rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex space-x-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu pregunta matemática..."
                className="min-h-[60px] resize-none"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-violet-600 hover:bg-violet-700 dark:bg-violet-700 dark:hover:bg-violet-600"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                <span className="sr-only">Enviar mensaje</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
