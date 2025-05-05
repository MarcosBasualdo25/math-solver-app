import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calculator, MessageSquare, BookOpen } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-violet-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-violet-900 sm:text-5xl md:text-6xl">
            Resuelve problemas matemáticos paso a paso
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Interpreta problemas escritos o imágenes, obtén soluciones detalladas con fórmulas en LaTeX y aprende con
            nuestro chatbot interactivo.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-violet-600 hover:bg-violet-700">
              <Link href="/solver">
                Resolver problema <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-violet-600 text-violet-600 hover:bg-violet-50"
            >
              <Link href="/chat">
                Chatear con asistente <MessageSquare className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Características principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Resolución paso a paso</h3>
              <p className="text-gray-600">
                Obtén soluciones detalladas con cada paso explicado claramente y fórmulas en formato LaTeX.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Múltiples temas</h3>
              <p className="text-gray-600">
                Soporte para álgebra, cálculo básico, geometría, trigonometría y más temas matemáticos.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Chatbot interactivo</h3>
              <p className="text-gray-600">Resuelve dudas teóricas con ejemplos prácticos y explicaciones claras.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Cómo funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-12 w-12 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ingresa tu problema</h3>
              <p className="text-gray-600">
                Escribe tu problema matemático o sube una imagen con la ecuación o problema.
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Selecciona el tema</h3>
              <p className="text-gray-600">
                Elige el área matemática para obtener soluciones más precisas y contextualizadas.
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Obtén la solución</h3>
              <p className="text-gray-600">
                Recibe una solución detallada paso a paso con explicaciones y fórmulas en LaTeX.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
