import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeField, AutoResizeInput } from './BaseNode';

export const ConditionalNode = ({ id }) => {
  const [condition, setCondition] = useState('');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-true`, style: { top: '33%' } },
    { type: 'source', position: Position.Right, id: `${id}-false`, style: { top: '66%' } },
  ];

  return (
    <BaseNode id={id} title="Conditional" handles={handles} className="node-conditional">
      <NodeField label="If condition">
        <AutoResizeInput value={condition} onChange={setCondition} placeholder="e.g. length > 100" />
      </NodeField>
      <div className="condition-labels">
        <span className="label-true">✓ True</span>
        <span className="label-false">✗ False</span>
      </div>
    </BaseNode>
  );
};
