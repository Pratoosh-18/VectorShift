import React, { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeField, AutoResizeInput } from './BaseNode';
import { useStore } from '../store/useStore';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [currName, setCurrName] = useState(data?.inputName ?? id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  useEffect(() => {
    updateNodeField(id, 'inputName', currName);
  }, [id, currName, updateNodeField]);
  useEffect(() => {
    updateNodeField(id, 'inputType', inputType);
  }, [id, inputType, updateNodeField]);

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-value` },
  ];

  const outputs = [
    { name: 'value', type: 'Text', description: 'The input value passed to the workflow' },
  ];

  return (
    <BaseNode id={id} title="Input" handles={handles} className="node-input" outputs={outputs}>
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
