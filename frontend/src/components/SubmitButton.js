import { useState } from 'react';
import { useStore } from '../store/useStore';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [popup, setPopup] = useState(null);

  const handleSubmit = async () => {
    try {
      const pipelineNodes = nodes.filter((n) => n.type !== 'note');
      const pipelineNodeIds = new Set(pipelineNodes.map((n) => n.id));
      const pipelineEdges = edges.filter(
        (e) => pipelineNodeIds.has(e.source) && pipelineNodeIds.has(e.target)
      );

      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodes: pipelineNodes.map((n) => ({ id: n.id, type: n.type, data: n.data })),
          edges: pipelineEdges.map((e) => ({ source: e.source, target: e.target })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      setPopup({ type: 'success', data });
    } catch (err) {
      setPopup({ type: 'error', message: err.message });
    }
  };

  return (
    <>
      <div className="submit-bar">
        <button className="submit-button" onClick={handleSubmit}>
            Submit Pipeline
        </button>
      </div>

      {popup && (
        <div className="popup-overlay" onClick={() => setPopup(null)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            {popup.type === 'success' ? (
              <>
                <div className={`popup-icon ${popup.data.is_dag ? 'popup-icon-success' : 'popup-icon-warning'}`}>
                  {popup.data.is_dag ? '✓' : '!'}
                </div>
                <h2 className="popup-title">Pipeline Analysis</h2>
                <div className="popup-stats">
                  <div className="popup-stat">
                    <span className="popup-stat-value">{popup.data.num_nodes}</span>
                    <span className="popup-stat-label">Nodes</span>
                  </div>
                  <div className="popup-stat">
                    <span className="popup-stat-value">{popup.data.num_edges}</span>
                    <span className="popup-stat-label">Edges</span>
                  </div>
                  <div className="popup-stat">
                    <span className={`popup-stat-value ${popup.data.is_dag ? 'stat-success' : 'stat-danger'}`}>
                      {popup.data.is_dag ? 'Yes' : 'No'}
                    </span>
                    <span className="popup-stat-label">Is DAG</span>
                  </div>
                </div>
                <p className="popup-message">
                  {popup.data.is_dag
                    ? 'This pipeline forms a valid Directed Acyclic Graph.'
                    : 'This pipeline contains cycles and is not a DAG.'}
                </p>
              </>
            ) : (
              <>
                <div className="popup-icon popup-icon-error">✗</div>
                <h2 className="popup-title">Error</h2>
                <p className="popup-message">{popup.message}</p>
              </>
            )}
            <button className="popup-close" onClick={() => setPopup(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
