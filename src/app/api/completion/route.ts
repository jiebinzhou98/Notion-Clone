import { google } from '@ai-sdk/google'
import { streamText } from 'ai'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const stream = await streamText({
    model: google('gemini-1.5-flash'),
    messages: [
      { 
        role: 'system', 
        content: 'You are a writing assistant. Continue the text naturally.' 
      },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7
  })

  return stream.toDataStreamResponse()
}