import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { tools } from '@/lib/tools';



export const runtime = 'edge';

export async function POST(request: Request) {
  const { messages } = await request.json();

  const result = streamText({
    model: openai('gpt-4'),
    system: 'You are a helpful assistant that can check weather. Use the getWeather function when asked about weather in any location.',
    messages,
    maxSteps: 5,
    tools,
  });

  return result.toDataStreamResponse();
} 