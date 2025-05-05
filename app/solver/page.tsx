"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, ImageIcon, Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import MathSolution from "@/components/math-solution"

export default function SolverPage() {
  const [problem, setProblem] = useState("")
  const [topic, setTopic] = useState("algebra")
  const [isLoading, setIsLoading] = useState(false)
  const [solution, setSolution] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("text")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSolve = async () => {
    if (!problem.trim()) return

    setIsLoading(true)
    setSolution(null)

    try {
      // Llamada real a la API de Gemini
      const response = await fetch("/api/solve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ problem, topic }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      // Procesar la respuesta de streaming
      const reader = response.body?.getReader()
      if (!reader) throw new Error("No se pudo leer la respuesta")

      let solutionText = ""
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
                  solutionText += parsed.text
                  setSolution(solutionText)
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

      setSolution(solutionText)
    } catch (error) {
      console.error("Error al resolver el problema:", error)
      setSolution("Ocurrió un error al procesar tu solicitud. Por favor, intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // En una implementación real, aquí se procesaría la imagen
      // y se extraería el texto del problema matemático
      setProblem("Ecuación extraída de la imagen: x² - 5x + 6 = 0")
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Resuelve tu problema matemático
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="text">Texto</TabsTrigger>
                  <TabsTrigger value="image">Imagen</TabsTrigger>
                </TabsList>
                <TabsContent value="text" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="problem">Escribe tu problema matemático</Label>
                    <Textarea
                      id="problem"
                      placeholder="Ej: x² - 5x + 6 = 0"
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      className="min-h-[150px]"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="image" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Sube una imagen con tu problema matemático</Label>
                    <div
                      className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      onClick={triggerFileInput}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileUpload}
                      />
                      <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Haz clic para subir o arrastra y suelta
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG o JPEG (máx. 5MB)</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="topic">Selecciona el tema</Label>
                  <Select value={topic} onValueChange={setTopic}>
                    <SelectTrigger id="topic">
                      <SelectValue placeholder="Selecciona un tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="algebra">Álgebra</SelectItem>
                      <SelectItem value="calculus">Cálculo</SelectItem>
                      <SelectItem value="geometry">Geometría</SelectItem>
                      <SelectItem value="trigonometry">Trigonometría</SelectItem>
                      <SelectItem value="statistics">Estadística</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleSolve}
                  disabled={isLoading || !problem.trim()}
                  className="w-full bg-violet-600 hover:bg-violet-700 dark:bg-violet-700 dark:hover:bg-violet-600"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resolviendo...
                    </>
                  ) : (
                    "Resolver problema"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="pt-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-[400px]">
                  <Loader2 className="h-12 w-12 animate-spin text-violet-600 dark:text-violet-400" />
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Resolviendo tu problema...</p>
                </div>
              ) : solution ? (
                <MathSolution solution={solution} />
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <ImageIcon className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Aún no hay solución</h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md">
                    Escribe o sube una imagen de tu problema matemático y haz clic en "Resolver problema" para obtener
                    una solución paso a paso.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
