import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function POST(req) {
  try {
    const { question } = await req.json()

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    })

    const result = await model.generateContent(question)

    const response = await result.response
    const text = response.text()

    return Response.json({ response: text })

  } catch (error) {
    console.error("ERRO DETALHADO:", error)

    return Response.json(
      { response: "Erro ao gerar resposta da IA." },
      { status: 500 }
    )
  }
}