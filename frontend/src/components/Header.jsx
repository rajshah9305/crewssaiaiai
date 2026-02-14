function Header({ onChangeApiKey, hasApiKey }) {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Universal NLP</h1>
              <p className="text-xs text-gray-600">crewAI + Groq</p>
            </div>
          </div>

          {/* API Key Button */}
          <button
            onClick={onChangeApiKey}
            className="text-gray-600 hover:text-gray-900 transition-colors p-2"
            title="Change API Key"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
