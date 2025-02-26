'use client';

import { Message, useChat } from '@ai-sdk/react';
import { Weather } from '@/components/Weather';
import { ThemeChanger } from '@/components/ThemeChanger';
import { useRef, useEffect } from 'react';
import { Confetti } from '@/components/Confetti';

/**
 * ChatComponent.tsx
 * 
 * This file implements a full-featured chat interface that supports:
 * 1. Basic text messages between user and AI
 * 2. Interactive tools/widgets (Weather, Theme Changing, Confirmations)
 * 3. Auto-scrolling to new messages
 * 4. A fixed input form at the bottom
 * 
 * The component uses the @ai-sdk/react package for handling chat state and interactions
 */

/**
 * renderMessage - Renders a single message in the chat
 * 
 * @param message - The message object containing:
 *   - id: unique message identifier
 *   - role: 'user' or 'ai'
 *   - parts: array of message parts (text or tool invocations)
 * 
 * @param addToolResult - Callback function to handle user interactions with tools
 *                       (like clicking Yes/No on confirmation dialogs)
 */
function renderMessage(message: Message, addToolResult: (result: { toolCallId: string; result: any }) => void) {
  return (
    <div key={message.id} className="mb-4">
      {/* Display who sent the message (User or AI) */}
      <div className="font-bold mb-2">
        {message.role === 'user' ? 'User: ' : 'AI: '}
      </div>
      
      {/* Render each part of the message - could be text or a tool response */}
      {message.parts?.map((part, index: number) => {
        switch (part.type) {
          // Simple text messages just get rendered as-is
          case 'text':
            return <div key={index} className="whitespace-pre-wrap">{part.text}</div>;

          // Tool invocations are special UI components that can be interactive
          case 'tool-invocation': {
            const callId = part.toolInvocation.toolCallId;

            // Handle different types of tools
            switch (part.toolInvocation.toolName) {
              // Self-destruct tool - Shows a dramatic warning message with animation
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

              // Weather tool - Displays weather information or error state
              case 'displayWeather': {
                switch (part.toolInvocation.state) {
                  case 'call':
                    return <div key={callId} className="text-muted-foreground italic mt-2">Loading weather...</div>;
                  case 'result':
                    if (part.toolInvocation.result.error) {
                      return (
                        <div key={callId}>
                          <Weather error={part.toolInvocation.result.error} />
                        </div>
                      );
                    }
                    return (
                      <div key={callId}>
                        <Weather {...part.toolInvocation.result} />
                      </div>
                    );
                }
                break;
              }

              // Theme changer tool - Allows users to modify the UI theme
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

              // Confirmation tool - Shows Yes/No dialog and handles user choice
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
  );
}

/**
 * Main ChatComponent
 * 
 * This is the primary component that manages the chat interface.
 * It uses the useChat hook to manage state and message handling.
 */
export default function ChatComponent() {
  // Initialize chat functionality with useChat hook
  // This provides message history, input handling, and tool result handling
  const { messages, input, handleInputChange, handleSubmit, addToolResult } = useChat({
    api: '/api/chat',
    maxSteps: 5  // Limit the conversation to 5 back-and-forth exchanges
  });

  // Reference to scroll to the bottom of chat when new messages arrive
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto py-24">
      {/* Render all messages in the chat history */}
      {messages.map(message => renderMessage(message, addToolResult))}
      
      {/* Invisible div that helps with scrolling to bottom */}
      <div ref={messagesEndRef} />

      {/* Fixed position form at the bottom for user input */}
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