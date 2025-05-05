import Link from "next/link"
import { Calculator } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center">
              <Calculator className="h-8 w-8 text-violet-600 dark:text-violet-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">MathSolver</span>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md">
              Resuelve problemas matemáticos paso a paso con explicaciones detalladas y fórmulas en LaTeX. Aprende con
              nuestro chatbot interactivo.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Recursos
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="/topics"
                  className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Temas matemáticos
                </Link>
              </li>
              <li>
                <Link
                  href="/examples"
                  className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Ejemplos resueltos
                </Link>
              </li>
              <li>
                <Link
                  href="/formulas"
                  className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Fórmulas comunes
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Soporte</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="/faq"
                  className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-base text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} MathSolver. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
