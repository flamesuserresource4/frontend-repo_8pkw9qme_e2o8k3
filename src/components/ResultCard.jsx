import React from 'react'

export default function ResultCard({ result, onReset }) {
  if (!result) return null

  const top = result.top_types?.join(' / ')

  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Career Match</h3>
      <p className="text-gray-600 mb-4">Top Personality Type: <span className="font-semibold">{top}</span></p>
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Suggested Careers</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {result.careers?.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Summary</h4>
        <p className="text-gray-700 leading-relaxed">{result.summary}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-6">
        <button onClick={onReset} className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-3 rounded">Start Over</button>
        <a href="/test" className="text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded">Check Backend</a>
      </div>
    </div>
  )
}
