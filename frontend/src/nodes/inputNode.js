import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeField, AutoResizeInput } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-value` },
  ];

  return (
    <BaseNode id={id} title="Input" handles={handles} className="node-input">
      <NodeField label="Name">
        <AutoResizeInput value={currName} onChange={setCurrName} />
      </NodeField>
      <NodeField label="Type">
        <select value={inputType} onChange={(e) => setInputType(e.target.value)} className="node-select">
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};
