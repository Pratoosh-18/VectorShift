import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeField, AutoResizeInput } from './BaseNode';

export const MergerNode = ({ id }) => {
  const [strategy, setStrategy] = useState('concat');
  const [delimiter, setDelimiter] = useState('\\n');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input-a`, style: { top: '33%' } },
    { type: 'target', position: Position.Left, id: `${id}-input-b`, style: { top: '66%' } },
    { type: 'source', position: Position.Right, id: `${id}-merged` },
  ];

  const outputs = [
    { name: 'merged', type: 'Text', description: 'The merged result of both inputs' },
  ];

  return (
    <BaseNode id={id} title="Merger" handles={handles} className="node-merger" outputs={outputs}>
      <NodeField label="Strategy">
        <select value={strategy} onChange={(e) => setStrategy(e.target.value)} className="node-select">
          <option value="concat">Concatenate</option>
          <option value="alternate">Alternate</option>
          <option value="json_merge">JSON Merge</option>
        </select>
      </NodeField>
      <NodeField label="Delimiter">
        <AutoResizeInput value={delimiter} onChange={setDelimiter} placeholder="\\n" />
      </NodeField>
    </BaseNode>
  );
};
