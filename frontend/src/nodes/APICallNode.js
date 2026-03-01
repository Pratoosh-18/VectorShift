import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeField, AutoResizeInput } from './BaseNode';

export const APICallNode = ({ id }) => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState('');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-body` },
    { type: 'source', position: Position.Right, id: `${id}-response` },
  ];

  const outputs = [
    { name: 'response', type: 'Text', description: 'The API response body' },
    { name: 'status', type: 'Text', description: 'HTTP status code' },
  ];

  return (
    <BaseNode id={id} title="API Call" handles={handles} className="node-api" outputs={outputs}>
      <NodeField label="Method">
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="node-select">
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
      </NodeField>
      <NodeField label="URL">
        <AutoResizeInput value={url} onChange={setUrl} placeholder="https://api.example.com/..." />
      </NodeField>
      <NodeField label="Headers (JSON)">
        <AutoResizeInput value={headers} onChange={setHeaders} placeholder='{"Authorization": "Bearer ..."}' />
      </NodeField>
    </BaseNode>
  );
};
