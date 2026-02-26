import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeField, AutoResizeInput } from './BaseNode';

export const FilterNode = ({ id }) => {
  const [field, setField] = useState('');
  const [operator, setOperator] = useState('equals');
  const [value, setValue] = useState('');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-passed`, style: { top: '33%' } },
    { type: 'source', position: Position.Right, id: `${id}-failed`, style: { top: '66%' } },
  ];

  return (
    <BaseNode id={id} title="Filter" handles={handles} className="node-filter">
      <NodeField label="Field">
        <AutoResizeInput value={field} onChange={setField} placeholder="e.g. status" />
      </NodeField>
      <NodeField label="Operator">
        <select value={operator} onChange={(e) => setOperator(e.target.value)} className="node-select">
          <option value="equals">Equals</option>
          <option value="contains">Contains</option>
          <option value="gt">Greater Than</option>
          <option value="lt">Less Than</option>
          <option value="regex">Regex Match</option>
        </select>
      </NodeField>
      <NodeField label="Value">
        <AutoResizeInput value={value} onChange={setValue} placeholder="e.g. active" />
      </NodeField>
    </BaseNode>
  );
};
