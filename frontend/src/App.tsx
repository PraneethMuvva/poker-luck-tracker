import { useState } from 'react'

interface Hand {
  id: number
  holeCards: string
  timestamp: Date
}

function App() {
  const [hands, setHands] = useState<Hand[]>([])
  const [handData, setHandData] = useState('')

  const addHands = () => {
    if (!handData.trim()) return

    const lines = handData.trim().split('\n')
    const newHands: Hand[] = []

    lines.forEach((line, index) => {
      const holeCards = line.trim()
      if (holeCards) {
        newHands.push({
          id: Date.now() + index,
          holeCards,
          timestamp: new Date()
        })
      }
    })

    if (newHands.length > 0) {
      setHands([...hands, ...newHands])
      setHandData('')
    }
  }

  const removeHand = (id: number) => {
    setHands(hands.filter(hand => hand.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-black/5 text-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-black to-red-900 shadow-lg border-b-4 border-red-500">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white border-3 border-red-500 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                <span className="text-2xl">🃏</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">Am I Card Dead</h1>
                <p className="text-sm text-red-200">Hole Card Tracker</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-red-500 border-2 border-white rounded-lg px-4 py-2 shadow-md">
                <div className="text-white text-sm font-bold">Total Hands: {hands.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Input Form */}
        <div className="bg-white border-4 border-black rounded-xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-black">Add Hole Cards</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-black mb-2">Hole Cards</label>
              <div className="mb-3 text-sm text-black bg-red-50 border-2 border-red-300 rounded-lg p-3">
                <strong className="text-red-700">Format:</strong> Enter one or more hole cards, one per line<br/>
                <strong className="text-red-700">Examples:</strong><br/>
                <span className="text-black">• Single: <code className="bg-white px-1 rounded border border-red-300">As Kh</code></span><br/>
                <span className="text-black">• Multiple: One hand per line</span>
              </div>
              <textarea
                placeholder="Enter hole cards, one per line..."
                className="w-full h-36 px-4 py-3 bg-white border-3 border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-red-500 focus:border-red-500 transition-all text-black placeholder-red-400 font-mono text-sm resize-none shadow-inner"
                value={handData}
                onChange={(e) => setHandData(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-black bg-red-100 px-3 py-1 rounded-full border border-red-300">
                {handData.split('\n').filter(line => line.trim()).length} hands ready to add
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setHandData('')}
                  className="px-4 py-2 text-sm border-3 border-black text-black rounded-lg hover:bg-black hover:text-white transition-all duration-200 font-semibold"
                >
                  Clear
                </button>
                <button
                  onClick={addHands}
                  disabled={!handData.trim()}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-8 rounded-lg text-sm font-bold hover:from-red-600 hover:to-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg border-2 border-white"
                >
                  Add Hands
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hands List */}
        {hands.length > 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Hand History ({hands.length} hands)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hands.map((hand, index) => (
                <div key={hand.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600 text-sm font-medium">Hand #{index + 1}</span>
                    <button
                      onClick={() => removeHand(hand.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-100 rounded"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white border-2 border-red-500 rounded-lg p-3 text-center">
                      <span className="text-gray-900 font-medium font-mono">
                        {hand.holeCards || 'No cards specified'}
                      </span>
                    </div>
                    <div className="text-gray-500 text-xs text-center">
                      Added {hand.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-lg">
            <div className="text-6xl mb-4">🃏</div>
            <h3 className="text-xl font-medium mb-2 text-gray-900">No hands recorded yet</h3>
            <p className="text-gray-600">Start adding hole cards using the form above</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
