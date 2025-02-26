/**
 * Chat API Route Handler
 * 
 * This file handles the server-side processing of chat messages using the OpenAI API.
 * It's implemented as a Next.js Edge API route for optimal performance and scalability.
 */

import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { tools } from '@/lib/tools';


export const runtime = 'edge';

/**
 * Processes incoming chat messages and returns AI responses with tool interactions.
 * 
 * Request body format:
 * {
 *   messages: [
 *     { role: 'user', content: 'Hello' },
 *     { role: 'assistant', content: 'Hi there!' },
 *     ...
 *   ]
 * }
 * 
 */
export async function POST(request: Request) {
  // Extract messages from the request body
  const { messages } = await request.json();

  // Configure and create the streaming response
  const result = streamText({
    // Use GPT-4 for high-quality responses and better tool usage
    model: openai('gpt-4'),
    
    // System message defines the AI's behavior and capabilities
    system: `You are a helpful assistant that can check weather. Use the getWeather function when asked about weather in any location.
    You can also use the displayThemeChanger function to change the theme of the page.
    You can also use the askForConfirmation function to ask for confirmation before proceeding with a task.
    You can also use the selfDestruct function to self-destruct, YOU MUST ASK FOR CONFIRMATION BEFORE USING THIS FUNCTION.`,
    
    // Pass the conversation history
    messages,
    
    // Limit conversation turns for safety and performance
    maxSteps: 5,
    
    // Provide available tools that the AI can use
    // These are defined in lib/tools.ts and include:
    // - Weather information
    // - Theme changing
    // - Confirmation dialogs
    // - Self-destruct sequence
    tools,
  });

  // Convert the stream to a format that can be consumed by the frontend
  return result.toDataStreamResponse();
} 