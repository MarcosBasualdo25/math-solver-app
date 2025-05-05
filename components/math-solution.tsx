"use client"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
// Remove this line:
// import "katex/dist/katex.min.css"

interface MathSolutionProps {
  solution: string
}

export default function MathSolution({ solution }: MathSolutionProps) {
  return (
    <div className="math-solution overflow-auto max-h-[600px] pr-2">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-bold mt-6 mb-3 text-violet-800 dark:text-violet-400" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200" {...props} />
          ),
          p: ({ node, ...props }) => <p className="my-2 text-gray-700 dark:text-gray-300" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2" {...props} />,
          li: ({ node, ...props }) => <li className="my-1" {...props} />,
        }}
        className="prose prose-violet dark:prose-invert max-w-none"
      >
        {solution}
      </ReactMarkdown>
    </div>
  )
}
