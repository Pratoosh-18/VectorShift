import React from 'react';
import { Toolbar } from './components/Toolbar';
import { PipelineCanvas } from './components/PipelineCanvas';
import { SubmitButton } from './components/SubmitButton';
import { AutoConnectEdges } from './components/AutoConnectEdges';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <AutoConnectEdges />
        <Toolbar />
        <PipelineCanvas />
        <SubmitButton />
      </div>
    </ThemeProvider>
  );
}

export default App;
