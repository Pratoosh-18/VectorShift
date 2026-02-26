import {
  FileInput,
  Brain,
  FileOutput,
  Type,
  Filter,
  GitMerge,
  GitBranch,
  Globe,
  StickyNote,
} from 'lucide-react';
import { DraggableNode } from './DraggableNode';
import { useTheme } from '../context/ThemeContext';

export const Toolbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="toolbar">
      <div className="toolbar-brand">
        <span className="toolbar-title">Pipeline Builder</span>
      </div>
      <div className="toolbar-nodes">
        <DraggableNode type="customInput" label="Input" icon={FileInput} />
        <DraggableNode type="llm" label="LLM" icon={Brain} />
        <DraggableNode type="customOutput" label="Output" icon={FileOutput} />
        <DraggableNode type="text" label="Text" icon={Type} />
        <DraggableNode type="filter" label="Filter" icon={Filter} />
        <DraggableNode type="merger" label="Merger" icon={GitMerge} />
        <DraggableNode type="conditional" label="Conditional" icon={GitBranch} />
        <DraggableNode type="apiCall" label="API Call" icon={Globe} />
        <DraggableNode type="note" label="Note" icon={StickyNote} />
      </div>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <span className="theme-toggle-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
      </button>
    </div>
  );
};
