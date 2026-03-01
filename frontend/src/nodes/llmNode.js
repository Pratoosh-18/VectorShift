import React from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: '33%' } },
    { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: '66%' } },
    { type: 'source', position: Position.Right, id: `${id}-response` },
  ];

  const outputs = [
    { name: 'response', type: 'Text', description: 'Generated response from the model' },
  ];

  return (
    <BaseNode id={id} title="LLM" icon="🧠" handles={handles} className="node-llm" outputs={outputs}>
      <div className="node-info-text">
        <span className="node-badge">GPT-4</span>
        <p>Processes system prompt and user prompt to generate a response.</p>
      </div>
    </BaseNode>
  );
};
