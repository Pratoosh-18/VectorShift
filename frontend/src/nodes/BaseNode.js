import React, { useEffect, useRef, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { X, ChevronRight, ExternalLink } from 'lucide-react';
import { useStore } from '../store/useStore';

export function AutoResizeInput({ value, onChange, placeholder, className = 'node-text-input node-input-auto', ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = 'auto';
    ref.current.style.height = Math.max(34, ref.current.scrollHeight) + 'px';
  }, [value]);

  return (
    <textarea
      ref={ref}
      className={className}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={1}
      {...rest}
    />
  );
}

function OutputSidebar({ outputs, expanded, onToggle }) {
  if (!outputs || outputs.length === 0) return null;

  return (
    <div className={`output-sidebar ${expanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
      {!expanded ? (
        <button
          type="button"
          className="output-sidebar-tab"
          onClick={onToggle}
          onMouseDown={(e) => e.stopPropagation()}
          title="Show outputs"
        >
          <ExternalLink size={13} />
          <span className="output-sidebar-tab-label">Outputs</span>
        </button>
      ) : (
        <div className="output-sidebar-panel">
          <div className="output-sidebar-header">
            <span className="output-sidebar-header-title">Outputs</span>
            <button
              type="button"
              className="output-sidebar-close"
              onClick={onToggle}
              onMouseDown={(e) => e.stopPropagation()}
              title="Collapse outputs"
            >
              <ExternalLink size={13} />
            </button>
          </div>
          <div className="output-sidebar-list">
            {outputs.map((o) => (
              <div className="output-sidebar-item" key={o.name}>
                <div className="output-sidebar-item-row">
                  <span className="output-sidebar-name">{o.name}</span>
                  <span className="output-sidebar-badge">{o.type}</span>
                </div>
                {o.description && (
                  <p className="output-sidebar-desc">{o.description}</p>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            className="output-sidebar-advanced"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <span className="output-sidebar-advanced-dot" />
            <span>Advanced Outputs</span>
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

export const BaseNode = ({ id, title, icon, handles = [], children, className = '', style: customStyle, outputs = [] }) => {
  const removeNode = useStore((s) => s.removeNode);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlesByPosition = {};
  handles.forEach((h) => {
    const key = h.position;
    if (!handlesByPosition[key]) handlesByPosition[key] = [];
    handlesByPosition[key].push(h);
  });

  const hasOutputs = outputs.length > 0;

  return (
    <div className={`base-node-wrapper ${hasOutputs ? 'has-sidebar' : ''} ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className={`base-node ${className}`} style={customStyle}>
        <div className="base-node-header">
          {icon != null && <span className="base-node-icon">{icon}</span>}
          <span className="base-node-title">{title}</span>
          <button
            type="button"
            className="base-node-delete"
            onClick={(e) => { e.stopPropagation(); removeNode(id); }}
            onMouseDown={(e) => e.stopPropagation()}
            title="Delete node"
          >
            <X size={12} strokeWidth={2.5} />
          </button>
        </div>
        <div className="base-node-body">
          {children}
        </div>
      </div>

      {hasOutputs && (
        <OutputSidebar
          outputs={outputs}
          expanded={sidebarOpen}
          onToggle={() => setSidebarOpen((v) => !v)}
        />
      )}

      {handles.map((handle) => {
        const group = handlesByPosition[handle.position];
        const idx = group.indexOf(handle);
        const total = group.length;
        const defaultStyle =
          handle.position === Position.Left || handle.position === Position.Right
            ? { top: `${((idx + 1) / (total + 1)) * 100}%` }
            : {};

        return (
          <Handle
            key={handle.id}
            type={handle.type}
            position={handle.position}
            id={handle.id}
            className={`base-handle ${handle.type === 'source' ? 'handle-source' : 'handle-target'}`}
            style={handle.style || defaultStyle}
          />
        );
      })}
    </div>
  );
};

export function NodeField({ label, children }) {
  return (
    <div className="node-field">
      {label != null && <label className="node-field-label">{label}</label>}
      {children}
    </div>
  );
}
