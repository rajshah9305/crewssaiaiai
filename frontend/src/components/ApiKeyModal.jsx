import { useState } from 'react'

function ApiKeyModal({ onSubmit }) {
  const [key, setKey] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!key.trim()) {
      setError('API key is required')
      return
    }
    
    if (!key.startsWith('gsk_')) {
      setError('Invalid Groq API key format (should start with gsk_)')
      return
    }
    
    onSubmit(key)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-2xl max-w-md w-full relative">
        <button
          onClick={() => onSubmit('')}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Enter Your Groq API Key
        </h2>
        
        <p className="text-gray-700 mb-6">
          Your API key is stored in memory only and never persisted to disk.
          Get your key at{' '}
          <a
            href="https://console.groq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            console.groq.com
          </a>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <input
              id="api-key"
              type="password"
              value={key}
              onChange={(e) => {
                setKey(e.target.value)
                setError('')
              }}
              placeholder="gsk_..."
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-4 py-3 placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors duration-200"
              autoFocus
              aria-required="true"
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? 'api-key-error' : undefined}
            />
            {error && (
              <p id="api-key-error" className="mt-2 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
          </div>

          <button type="submit" className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full">
            Continue
          </button>
        </form>

        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-900">
            <strong>Security:</strong> Your API key is never stored on our servers.
            It's only kept in your browser's memory for the current session.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ApiKeyModal
