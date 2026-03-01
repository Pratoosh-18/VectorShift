import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store/useStore';

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [currText, setCurrText] = useState(data?.text ?? '{{input}}');
  const textareaRef = useRef(null);

  useEffect(() => {
    updateNodeField(id, 'text', currText);
  }, [id, currText, updateNodeField]);

  const variables = useMemo(() => {
    const regex = /\{\{\s*([a-zA-Z_]\w*)\s*\}\}/g;
    const vars = [];
    const seen = new Set();
    let match;
    while ((match = regex.exec(currText)) !== null) {
      const name = match[1];
      if (!seen.has(name)) {
        seen.add(name);
        vars.push(name);
      }
    }
    return vars;
  }, [currText]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [currText]);

  const dynamicHandles = variables.map((varName, idx) => ({
    type: 'target',
    position: Position.Left,
    id: `${id}-var-${varName}`,
    style: { top: `${((idx + 1) / (variables.length + 1)) * 100}%` },
  }));

  const handles = [
    ...dynamicHandles,
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  const outputs = [
    { name: 'output', type: 'Text', description: 'The processed text with variables resolved' },
  ];

  return (
    <BaseNode id={id} title="Text" handles={handles} className="node-text" outputs={outputs}>
      <div className="text-node-content">
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          className="node-textarea"
          placeholder="Type text here... Use {{variable}} for inputs"
          rows={2}
        />
        {variables.length > 0 && (
          <div className="variable-tags">
            {variables.map((v) => (
              <span key={v} className="variable-tag">{`{{${v}}}`}</span>
            ))}
          </div>
        )}
      </div>
    </BaseNode>
  );
};
