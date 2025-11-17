import { useEffect, useMemo, useState } from 'react'
import QuestionCard from './components/QuestionCard'
import ResultCard from './components/ResultCard'

function App() {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${backend}/api/questions`)
        const data = await res.json()
        setQuestions(data)
      } catch (e) {
        setError('Unable to load questions. Please try again later.')
      }
    }
    load()
  }, [backend])

  const canSubmit = useMemo(() => {
    return questions.length > 0 && Object.keys(answers).length === questions.length
  }, [answers, questions])

  const handleAnswer = (id, choice) => {
    setAnswers((prev) => ({ ...prev, [id]: choice }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const payload = {
        name: name || undefined,
        email: email || undefined,
        answers: Object.entries(answers).map(([qid, choice]) => ({
          question_id: Number(qid),
          choice,
        })),
      }
      const res = await fetch(`${backend}/api/assess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to assess')
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setAnswers({})
    setResult(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-teal-50">
      <header className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Career Pathfinder</h1>
        <p className="text-gray-600 mt-2">Answer quick questions to discover your personality type and careers that fit you.</p>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-16">
        {!result && (
          <div className="bg-white/70 backdrop-blur rounded-2xl shadow-lg p-6 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-4">
              {questions.map((q, idx) => (
                <QuestionCard
                  key={q.id}
                  index={idx}
                  question={q}
                  value={answers[q.id]}
                  onChange={(choice) => handleAnswer(q.id, choice)}
                />
              ))}
            </div>

            {error && (
              <div className="p-3 rounded bg-red-50 text-red-700 border border-red-200">{error}</div>
            )}

            <div className="flex items-center justify-between">
              <a href="/test" className="text-sm text-blue-700 hover:underline">Check backend status</a>
              <button
                disabled={!canSubmit || loading}
                onClick={handleSubmit}
                className="bg-blue-600 disabled:bg-blue-300 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg"
              >
                {loading ? 'Scoring...' : 'See my results'}
              </button>
            </div>
          </div>
        )}

        {result && (
          <ResultCard result={result} onReset={reset} />
        )}
      </main>
    </div>
  )
}

export default App
