import { useState } from 'react'

function OutputPane({ result, error, loading }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (result?.result) {
      navigator.clipboard.writeText(result.result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const isCodeOutput = (text) => {
    if (!text) return false
    const codeIndicators = [
      /```/,
      /function\s+\w+\s*\(/,
      /class\s+\w+/,
      /import\s+.*from/,
      /const\s+\w+\s*=/,
      /def\s+\w+\s*\(/,
      /<\w+.*>/,
      /\{[\s\S]*\}/
    ]
    return codeIndicators.some(pattern => pattern.test(text))
  }

  const renderOutput = () => {
    if (!result) return null

    const isCode = isCodeOutput(result.result)

    if (isCode) {
      return (
        <div className="bg-black/60 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-green-400 whitespace-pre-wrap break-words">
            {result.result}
          </pre>
        </div>
      )
    }

    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="prose prose-gray max-w-none">
          <div className="text-gray-900 leading-relaxed whitespace-pre-wrap break-words">
            {result.result}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Generated Output
        </h2>
        {result && (
          <button
            onClick={handleCopy}
            className="text-gray-600 hover:text-gray-900 transition-colors p-2 flex items-center space-x-1"
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs text-green-600">Copied!</span>
              </>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <svg
                className="animate-spin h-12 w-12 text-accent-400 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <p className="text-gray-600">Generating output...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-red-600 font-semibold mb-1">Error</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && !result && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Ready to Generate
              </h3>
              <p className="text-gray-500 text-sm">
                Enter your task below to see AI-generated output
              </p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            {/* Intent Badge */}
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {result.intent}
              </span>
              {isCodeOutput(result.result) && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Code
                </span>
              )}
            </div>

            {/* Output */}
            {renderOutput()}

            {/* Metadata */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200">
              <div className="bg-gray-50 rounded p-2">
                <div className="text-[10px] text-gray-600 uppercase tracking-wide mb-1">Tokens</div>
                <div className="text-sm font-semibold text-gray-900">{result.tokens_used?.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 rounded p-2">
                <div className="text-[10px] text-gray-600 uppercase tracking-wide mb-1">Time</div>
                <div className="text-sm font-semibold text-gray-900">{result.processing_time}s</div>
              </div>
              <div className="bg-gray-50 rounded p-2">
                <div className="text-[10px] text-gray-600 uppercase tracking-wide mb-1">Model</div>
                <div className="text-xs font-mono text-gray-900 truncate">{result.metadata?.model_name}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OutputPane
