import React from 'react'

export default function QuestionCard({ index, question, value, onChange }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
      <div className="text-sm text-gray-500 mb-1">Question {index + 1}</div>
      <div className="text-gray-800 font-medium mb-4">{question.text}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Object.entries(question.options).map(([key, label]) => (
          <label key={key} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${value === key ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
            <input
              type="radio"
              name={`q-${question.id}`}
              value={key}
              checked={value === key}
              onChange={() => onChange(key)}
              className="accent-blue-600"
            />
            <span className="font-medium">{label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
