import ChatComponent from '@/components/ChatComponent';

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="absolute top-4 right-4">
        
      </div>
      <h1 className="text-4xl font-bold text-center pt-8">Shire Generative UI Demo</h1>
      <p className="text-center text-muted-foreground mt-2 mb-8">
        This is a demo of the Shire Generative UI. Use the chat interface below to interact with these tools:
        <br />
        🌤️ Weather information for any city
        <br />
        🎨 Theme customization
        <br />
        ✅ Interactive confirmations
        <br />
        🚨 Fun self-destruct sequence
      </p>
     
      <ChatComponent />
    </div>
  );
}
