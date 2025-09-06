import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';
import { toolboxJson, scratchTheme } from './toolboxConfig';


// --- 3. THE BLOCKLY EDITOR REACT COMPONENT ---
interface BlocklyEditorProps {
  onCodeChange: (code: string) => void;
}

const BlocklyEditor: React.FC<BlocklyEditorProps> = ({ onCodeChange }) => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    if (!blocklyDiv.current) return;

    // Inject Blockly workspace
    const workspace = Blockly.inject(blocklyDiv.current, {
      toolbox: toolboxJson,
      theme: scratchTheme,
      renderer: 'zelos',
      grid: { spacing: 20, length: 3, colour: '#ccc', snap: true },
      zoom: { controls: true, wheel: true, startScale: 0.8 },
      trashcan: true,
    });
    workspaceRef.current = workspace;

    // Real-time code generation
    const updateCode = () => {
      const code = javascriptGenerator.workspaceToCode(workspace);
      onCodeChange(code);
    };
    workspace.addChangeListener(updateCode);
    updateCode();

    // Cleanup
    return () => workspace.dispose();
  }, [onCodeChange]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
        if (workspaceRef.current) Blockly.svgResize(workspaceRef.current);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div ref={blocklyDiv} style={{ height: '100%', width: '100%' }} />;
};
export default BlocklyEditor;