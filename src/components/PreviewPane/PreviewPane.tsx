import React, { useState } from 'react';

// --- 4. THE PREVIEW & LOGS COMPONENT (No changes needed) ---
interface PreviewPaneProps {
  code: string;
}

const PreviewPane: React.FC<PreviewPaneProps> = ({ code }) => {
    const [logs, setLogs] = useState<string[]>([]);
    
    // A mock environment for Scratch functions
    const createMockEnvironment = (logFunc: (s: string) => void) => ({
      move: (steps: number) => logFunc(`Action: Move ${steps} steps`),
      turnRight: (degrees: number) => logFunc(`Action: Turn Right ${degrees}°`),
      turnLeft: (degrees: number) => logFunc(`Action: Turn Left ${degrees}°`),
      say: (message: string) => logFunc(`Sprite says: ${message}`),
      think: (message: string) => logFunc(`Sprite thinks: ${message}`),
      wait: (duration: number) => logFunc(`Action: Wait for ${duration}s`),
      // Add other mock functions here
    });

    const handleRunCode = () => {
        const newLogs: string[] = [];
        const logFunc = (s: string) => newLogs.push(s);
        
        const mockEnv = createMockEnvironment(logFunc);
        
        // This makes `move`, `say`, etc. available as global functions during execution
        const context = {
            ...mockEnv,
            console: { log: logFunc }
        };

        try {
            // Create a function with our context
            const codeWithContext = `
                with (context) {
                    ${code}
                }
            `;
            const runnableCode = new Function('context', codeWithContext);
            runnableCode(context);
            setLogs(newLogs);
        } catch (error) {
            if(error instanceof Error){
                 setLogs([`Error: ${error.message}`]);
            } else {
                 setLogs(['An unknown error occurred.']);
            }
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-100 rounded-lg shadow-inner">
            <div className="p-4 border-b border-gray-300 flex justify-between items-center bg-white rounded-t-lg">
                <h2 className="text-xl font-bold text-gray-700">Preview & Logs</h2>
                <button 
                    onClick={handleRunCode}
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-200"
                >
                    Run Code
                </button>
            </div>
            <div className="flex-grow flex flex-col p-4 space-y-4">
                <div className="flex-1 flex flex-col bg-gray-800 text-white rounded-lg p-3 font-mono text-sm shadow-lg">
                   <h3 className="text-gray-400 mb-2">// Generated JavaScript</h3>
                   <pre className="flex-1 overflow-auto whitespace-pre-wrap"><code>{code || '// Drag blocks to generate code...'}</code></pre>
                </div>
                <div className="flex-1 flex flex-col bg-white rounded-lg p-3 shadow-lg">
                    <h3 className="text-gray-600 font-semibold mb-2 border-b pb-2">Console Output</h3>
                    <div className="flex-1 overflow-auto text-gray-800 text-sm">
                        {logs.length > 0 ? logs.map((log, index) => (
                            <div key={index} className="p-1 border-b border-gray-200">{log}</div>
                        )) : <div className="text-gray-400">Click "Run Code" to see output...</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PreviewPane;