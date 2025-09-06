import { useState } from "react";
import BlocklyEditor from "./components/BlocklyEditor/BlocklyEditor";
import PreviewPane from "./components/PreviewPane/PreviewPane";

// --- 5. THE MAIN APP COMPONENT (No changes needed) ---
export default function App() {
  const [generatedCode, setGeneratedCode] = useState('');

  return (
    <div className="flex flex-col h-screen bg-gray-200 font-sans">
      <header className="w-full bg-blue-500 text-white p-3 shadow-md z-10">
        <h1 className="text-2xl font-bold">Blockly Diagram Editor (Corrected)</h1>
      </header>
      
      <main className="flex-grow flex p-4 space-x-4 overflow-hidden">
        <div className="w-2/3 h-full rounded-lg shadow-lg overflow-hidden">
          <BlocklyEditor onCodeChange={setGeneratedCode} />
        </div>
        
        <div className="w-1/3 h-full">
          <PreviewPane code={generatedCode} />
        </div>
      </main>
    </div>
  );
}
