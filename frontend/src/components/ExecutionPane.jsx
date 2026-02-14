import { useEffect, useRef } from 'react'

function ExecutionPane({ logs, isProcessing, executionHistory }) {
  const logsEndRef = useRef(null)

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <svg
            className={`w-5 h-5 mr-2 ${isProcessing ? 'animate-spin text-accent-400' : 'text-gray-400'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Live Executions
        </h2>
        {isProcessing && (
          <span className="text-xs text-accent-400 animate-pulse flex items-center">
            <span className="w-2 h-2 bg-accent-400 rounded-full mr-2 animate-ping"></span>
            Processing
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Current Execution Logs */}
        {logs.length > 0 && (
          <div className="p-4 border-b border-gray-200">
            <div className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              Current Execution
            </div>
            <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs space-y-2 max-h-64 overflow-y-auto">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className={`flex items-start space-x-2 ${
                    log.type === 'error' ? 'text-red-400' :
                    log.type === 'success' ? 'text-green-400' :
                    log.type === 'agent' ? 'text-blue-400' :
                    'text-gray-300'
                  }`}
                >
                  <span className="text-gray-600 select-none min-w-[70px] text-[10px]">
                    {log.timestamp}
                  </span>
                  <span className="flex-1 break-words">{log.message}</span>
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
        )}

        {/* Execution History */}
        <div className="p-4">
          <div className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">
            Execution History
          </div>
          {executionHistory.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm">No executions yet</p>
              <p className="text-xs mt-1">Start by entering a task below</p>
            </div>
          ) : (
            <div className="space-y-2">
              {executionHistory.map((execution) => (
                <div
                  key={execution.id}
                  className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {execution.status === 'running' && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      )}
                      {execution.status === 'completed' && (
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      )}
                      {execution.status === 'failed' && (
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      )}
                      <span className={`text-xs font-semibold ${
                        execution.status === 'running' ? 'text-blue-600' :
                        execution.status === 'completed' ? 'text-green-600' :
                        'text-red-600'
                      }`}>
                        {execution.status.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-500">
                      {new Date(execution.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {execution.input}
                  </p>
                  {execution.result && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <span className="text-xs text-accent-600">
                        Intent: {execution.result.intent}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExecutionPane
