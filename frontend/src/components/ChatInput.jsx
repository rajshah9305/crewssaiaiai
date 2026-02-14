import { useState } from 'react'

function ChatInput({ onSubmit, loading, disabled, models, selectedModel, onModelChange }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() && !loading) {
      onSubmit(input)
      setInput('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="px-4 py-3">
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your task in natural language... (Shift+Enter for new line)"
              className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-3 pr-40 border border-gray-300 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none resize-none"
              rows="2"
              disabled={disabled || loading}
            />
            {/* Model Selector - Right Side Center */}
            {models.length > 0 && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <select
                  value={selectedModel}
                  onChange={(e) => onModelChange(e.target.value)}
                  className="bg-white text-gray-700 text-xs rounded-md px-2 py-1 border border-gray-300 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none"
                  disabled={loading}
                  aria-label="Select AI model"
                >
                  {models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={disabled || loading || !input.trim()}
            className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
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
                <span>Processing</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Execute</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-2 text-xs text-gray-600 flex items-center justify-between">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span>{input.length} characters</span>
        </div>
      </div>
    </div>
  )
}

export default ChatInput
