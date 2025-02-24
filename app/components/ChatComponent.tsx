'use client';

import { useChat } from '@ai-sdk/react';
import { Weather } from '@/components/Weather';

export default function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto py-24">
      {messages.map(message => (
        <div key={message.id} className="mb-4">
          <div className="font-bold mb-2">
            {message.role === 'user' ? 'User: ' : 'AI: '}
          </div>
          <div className="whitespace-pre-wrap">{message.content}</div>

          <div>
            {message.toolInvocations?.map(toolInvocation => {
              const { toolName, toolCallId, state } = toolInvocation;

              if (state === 'result') {
                if (toolName === 'displayWeather') {
                  const { result } = toolInvocation;
                  return (
                    <div key={toolCallId}>
                      <Weather {...result} />
                    </div>
                  );
                }
              } else {
                return (
                  <div key={toolCallId}>
                    {toolName === 'displayWeather' ? (
                      <div className="text-gray-500 italic mt-2">Loading weather...</div>
                    ) : null}
                  </div>
                );
              }
            })}
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-xl p-4 mb-8 border border-gray-300 rounded-lg bg-white">
        <div className="flex gap-4">
          <input
            className="flex-1 p-2 outline-none"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about the weather..."
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
} 