import ChatComponent from '@/components/ChatComponent';
import { ThemeChanger } from '@/components/ThemeChanger';

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="absolute top-4 right-4">
        
      </div>
      <h1 className="text-4xl font-bold text-center pt-8">Shire Generative UI Demo</h1>
      <p className="text-center text-muted-foreground mt-2 mb-8">This is a demo of the Shire Generative UI. Use the chat interface below to interact with available tools like file editing, code generation, and task assistance.</p>
     
      <ChatComponent />
    </div>
  );
}
