# AI Engineer Demo - Interactive Chat with Tools and Generative UI

This is a Next.js application demonstrating AI-powered chat interactions with various tools like weather information, theme changing, and fun interactive elements. Built for the AI Engineer presentation to showcase real-world applications of AI tools, Generative UI, and Vercel AI SDK.

# Background on Generative UI

This demo showcases Generative UI concepts using the Vercel AI SDK. Here's what you need to know:

## What is Generative UI?

Generative UI allows AI to go beyond text responses and dynamically generate UI components based on user interactions. As the [Vercel AI SDK documentation](https://sdk.vercel.ai/docs/ai-sdk-ui/generative-user-interfaces) explains, this creates a more engaging and AI-native experience where the AI can:
- Generate and control UI components
- Connect tool results to React components
- Create interactive, context-aware interfaces
- Stream partial updates in real-time

## Key Concepts

1. **Tools**: Functions that enable AI to perform specialized tasks
   - [Tools Documentation](https://sdk.vercel.ai/docs/foundations/tools)
   - Consist of:
     - Description: Guides when the tool should be used
     - Parameters: Zod schema defining required inputs
     - Execute: Function that performs the action

2. **Tool States**: Each tool invocation has different states:
   - Call: When the tool is initially invoked
   - Result: When the tool returns data
   - Error: When something goes wrong

3. **UI Components**: React components that render tool results
   - Dynamic rendering based on tool state
   - Loading states during execution
   - Error handling and display

## In This Demo

We demonstrate these concepts through:
1. Weather Tool: 
   - Fetches real weather data via OpenWeather API
   - Displays dynamic weather components
   - Handles errors and loading states

2. Theme Tool:
   - Changes UI appearance
   - Demonstrates immediate visual feedback

3. Self-Destruct Tool:
   - Shows confirmation flows
   - Demonstrates animations and effects
   - Example of multi-step tool interactions

## Implementation Details

Key files to examine:
- `lib/tools.ts`: Tool definitions and parameters
- `components/Weather.tsx`: Weather data display
- `components/ChatComponent.tsx`: Main chat interface
- `actions/weather.ts`: API integration and error handling

For more examples and detailed implementation guides, see the [Vercel AI SDK Chatbot Tool Usage Guide](https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot-tool-usage).

## Features

- 🤖 AI Chat Interface with GPT-4
- 🌤️ Real-time Weather Information
- 🎨 Dynamic Theme Changing
- 💥 Interactive Elements (Self-Destruct with Confetti)
- 🔄 Streaming Responses
- ✅ User Confirmations

## Project Structure

```
├── app/
│   └── api/
│       └── chat/           # API route for chat functionality
├── components/
│   ├── ChatComponent.tsx   # Main chat interface
│   ├── Weather.tsx        # Weather display component
│   ├── ThemeChanger.tsx   # Theme switching component
│   ├── Countdown.tsx      # Countdown animation
│   └── Confetti.tsx      # Confetti animation
├── lib/
│   └── tools.ts           # Tool definitions for AI
├── actions/
│   └── weather.ts         # Weather API integration
```

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with:
```env
OPENAI_API_KEY=your_openai_api_key
OPENWEATHER_API_KEY=your_openweather_api_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Key Components

### API Route (`app/api/chat/route.ts`)
Handles chat interactions and tool integrations with the AI model.

### Tools (`lib/tools.ts`)
Defines available tools for the AI:
- Weather information
- Theme changing
- Self-destruct sequence
- Confirmation requests

### Actions (`actions/weather.ts`)
Server-side actions for external API integrations:
- OpenWeather API integration
- Error handling
- Data formatting

### Components
- `ChatComponent`: Main chat interface with streaming responses
- `Weather`: Displays weather information with error handling
- `ThemeChanger`: Manages theme switching
- `Countdown`: Animated countdown display
- `Confetti`: Celebration effects

## Environment Variables

Required environment variables:
- `OPENAI_API_KEY`: Your OpenAI API key
- `OPENWEATHER_API_KEY`: Your OpenWeather API key

Get your API keys from:
- OpenAI: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- OpenWeather: [https://openweathermap.org/api](https://openweathermap.org/api)

## Development Notes

- Uses the Edge runtime for optimal performance
- Implements streaming responses for real-time interactions
- Includes error handling for API failures
- Supports both light and dark themes
- Responsive design for all screen sizes

## Tech Stack

- Next.js 15
- React
- Vercel AI SDK
- TypeScript
- Tailwind CSS
- OpenAI API
- OpenWeather API
- Canvas Confetti

## Contributing

Feel free to submit issues and enhancement requests!


