'use client'

import { useState } from 'react'

export default function Home() {
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  async function ask() {
    if (!question) return

    setLoading(true)

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question })
    })

    const data = await res.json()

    setResponse(data.response)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl text-center">

        <h1 className="text-5xl font-bold mb-3">
          Nexa60
        </h1>

        <p className="text-xl text-zinc-400 mb-10">
          Pergunte qualquer dúvida sobre tecnologia
        </p>

        <textarea
          className="w-full p-4 rounded-xl text-black text-lg"
          rows={4}
          placeholder="Ex: Como mandar mensagem no WhatsApp?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={ask}
          className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white text-xl py-4 rounded-xl"
        >
          {loading ? 'Pensando...' : 'Perguntar'}
        </button>

        {response && (
          <div className="mt-8 bg-zinc-800 p-4 rounded-xl text-lg">
            {response}
          </div>
        )}

      </div>
    </main>
  )
}