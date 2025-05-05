import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const topics = [
  {
    id: "algebra",
    title: "Álgebra",
    description: "Ecuaciones, factorización, funciones, sistemas de ecuaciones, polinomios y más.",
    examples: ["Ecuaciones cuadráticas", "Factorización", "Sistemas de ecuaciones"],
  },
  {
    id: "calculus",
    title: "Cálculo",
    description: "Límites, derivadas, integrales, series, ecuaciones diferenciales y más.",
    examples: ["Derivadas", "Integrales", "Límites"],
  },
  {
    id: "geometry",
    title: "Geometría",
    description: "Áreas, volúmenes, teoremas, geometría analítica, transformaciones y más.",
    examples: ["Teorema de Pitágoras", "Áreas y volúmenes", "Geometría analítica"],
  },
  {
    id: "trigonometry",
    title: "Trigonometría",
    description: "Funciones trigonométricas, identidades, ecuaciones, triángulos y más.",
    examples: ["Funciones trigonométricas", "Identidades", "Ley de senos y cosenos"],
  },
  {
    id: "statistics",
    title: "Estadística y Probabilidad",
    description: "Probabilidad, distribuciones, estadística descriptiva, inferencia y más.",
    examples: ["Probabilidad", "Distribuciones", "Estadística descriptiva"],
  },
  {
    id: "linear-algebra",
    title: "Álgebra Lineal",
    description: "Matrices, vectores, espacios vectoriales, transformaciones lineales y más.",
    examples: ["Matrices y determinantes", "Espacios vectoriales", "Transformaciones lineales"],
  },
]

export default function TopicsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">Temas Matemáticos</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
        Explora los diferentes temas matemáticos que puedes resolver y aprender con nuestra aplicación. Cada tema
        incluye ejemplos y conceptos clave.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <Card key={topic.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-violet-700 dark:text-violet-400">{topic.title}</CardTitle>
              <CardDescription>{topic.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">Ejemplos:</h4>
              <ul className="list-disc pl-5 mb-4 text-gray-600 dark:text-gray-400 text-sm">
                {topic.examples.map((example, index) => (
                  <li key={index}>{example}</li>
                ))}
              </ul>
              <div className="flex justify-end">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="text-violet-600 border-violet-600 hover:bg-violet-50 dark:text-violet-400 dark:border-violet-400 dark:hover:bg-gray-800"
                >
                  <Link href={`/solver?topic=${topic.id}`}>
                    Resolver <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
