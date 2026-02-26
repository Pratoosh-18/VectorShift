import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeField, AutoResizeInput } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-value` },
  ];

  return (
    <BaseNode id={id} title="Output" handles={handles} className="node-output">
      <NodeField label="Name">
        <AutoResizeInput value={currName} onChange={setCurrName} />
      </NodeField>
      <NodeField label="Type">
        <select value={outputType} onChange={(e) => setOutputType(e.target.value)} className="node-select">
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};
