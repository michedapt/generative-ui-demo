'use client';

import { useChat } from '@ai-sdk/react';
import { Weather } from '@/components/Weather';
import { ThemeChanger } from '@/components/ThemeChanger';
import { useRef } from 'react';
import { Countdown } from '@/components/Countdown';
import { Confetti } from '@/components/Confetti';

/**
 * ChatComponent
 * 
 * A chat interface that:
 * 1. Handles messages between user and AI
 * 2. Supports tool-based responses (Weather, ThemeChanger, Confirmation, SelfDestruct)
 * 3. Auto-scrolls to new messages
 * 4. Provides a fixed-position input form
 */
export default function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit, addToolResult } = useChat({
    maxSteps: 5,

    // Handle automatic tool execution
    async onToolCall({ toolCall }) {
      if (toolCall.toolName === 'getLocation') {
        // Automatically handle location requests
        return 'London';
      }
    },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto py-24">
      {messages.map(message => (
        <div key={message.id} className="mb-4">
          <div className="font-bold mb-2">
            {message.role === 'user' ? 'User: ' : 'AI: '}
          </div>
          
          {message.parts.map((part, index) => {
            switch (part.type) {
              case 'text':
                return <div key={index} className="whitespace-pre-wrap">{part.text}</div>;

              case 'tool-invocation': {
                const callId = part.toolInvocation.toolCallId;

                switch (part.toolInvocation.toolName) {
                  case 'selfDestruct': {
                    switch (part.toolInvocation.state) {
                      case 'call':
                        return (
                          <div key={callId} className="mt-4 p-4 bg-card border border-destructive rounded-lg">
                            <p className="mb-3 text-destructive font-bold text-2xl">
                              initiating self-destruct sequence...
                            </p>
                          </div>
                        );
                      case 'result':
                        return (
                          <div key={callId} className="mt-4 p-8 bg-card border-2 border-destructive rounded-lg">
                            <Confetti />
                            <p className="text-4xl text-destructive font-bold text-center animate-pulse">
                              ⚠️ {part.toolInvocation.result.message} ⚠️
                            </p>
                          </div>
                        );
                    }
                    break;
                  }

                  case 'displayWeather': {
                    switch (part.toolInvocation.state) {
                      case 'call':
                        return <div key={callId} className="text-muted-foreground italic mt-2">Loading weather...</div>;
                      case 'result':
                        return (
                          <div key={callId}>
                            <Weather {...part.toolInvocation.result} />
                          </div>
                        );
                    }
                    break;
                  }

                  case 'displayThemeChanger': {
                    switch (part.toolInvocation.state) {
                      case 'call':
                        return <div key={callId} className="text-muted-foreground italic mt-2">Loading theme options...</div>;
                      case 'result':
                        return (
                          <div key={callId}>
                            <ThemeChanger themes={part.toolInvocation.result.themes} />
                          </div>
                        );
                    }
                    break;
                  }

                  case 'askForConfirmation': {
                    switch (part.toolInvocation.state) {
                      case 'call':
                        return (
                          <div key={callId} className="mt-4 p-4 bg-card border border-border rounded-lg">
                            <p className="mb-3 text-foreground">{part.toolInvocation.args.message}</p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => addToolResult({
                                  toolCallId: callId,
                                  result: 'Yes, confirmed.'
                                })}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => addToolResult({
                                  toolCallId: callId,
                                  result: 'No, denied.'
                                })}
                                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90"
                              >
                                No
                              </button>
                            </div>
                          </div>
                        );
                        
                      case 'result':
                        return (
                          <div key={callId} className="mt-2 text-muted-foreground italic">
                            Response: {part.toolInvocation.result}
                          </div>
                        );
                    }
                    break;
                  }
                }
              }
            }
          })}
        </div>
      ))}
      
      <div ref={messagesEndRef} />

      <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-xl p-4 mb-8 border border-border rounded-lg bg-card">
        <div className="flex gap-4">
          <input
            className="flex-1 p-2 bg-background text-foreground outline-none"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about the weather or change the theme..."
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
} 