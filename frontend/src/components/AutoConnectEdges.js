import { useEffect } from 'react';
import { useStore } from '../store/useStore';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_]\w*)\s*\}\}/g;

function getVariablesFromText(text) {
  if (!text || typeof text !== 'string') return [];
  const vars = [];
  const seen = new Set();
  let match;
  VARIABLE_REGEX.lastIndex = 0;
  while ((match = VARIABLE_REGEX.exec(text)) !== null) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      vars.push(name);
    }
  }
  return vars;
}

/**
 * When a Text node contains {{input_1}} and an Input node has name "input_1",
 * automatically connect the Input's output to the Text node's variable handle.
 */
export function AutoConnectEdges() {
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);
  const addEdgeByConnection = useStore((s) => s.addEdgeByConnection);

  useEffect(() => {
    const inputNodes = nodes.filter((n) => n.type === 'customInput');
    const textNodes = nodes.filter((n) => n.type === 'text');
    const inputNames = new Map();
    inputNodes.forEach((n) => {
      const name = n.data?.inputName;
      if (name != null && name !== '') inputNames.set(name.trim(), n);
    });

    textNodes.forEach((textNode) => {
      const text = textNode.data?.text;
      const variables = getVariablesFromText(text);
      variables.forEach((varName) => {
        const inputNode = inputNames.get(varName);
        if (!inputNode) return;
        const sourceHandle = `${inputNode.id}-value`;
        const targetHandle = `${textNode.id}-var-${varName}`;
        addEdgeByConnection({
          source: inputNode.id,
          sourceHandle,
          target: textNode.id,
          targetHandle,
        });
      });
    });
  }, [nodes, edges, addEdgeByConnection]);

  return null;
}
