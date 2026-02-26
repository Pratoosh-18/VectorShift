import React, { useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { X } from 'lucide-react';
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

export const BaseNode = ({ id, title, icon, handles = [], children, className = '', style: customStyle }) => {
  const removeNode = useStore((s) => s.removeNode);
  const handlesByPosition = {};
  handles.forEach((h) => {
    const key = h.position;
    if (!handlesByPosition[key]) handlesByPosition[key] = [];
    handlesByPosition[key].push(h);
  });

  return (
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
      {handles.map((handle) => {
        const samePositionHandles = handlesByPosition[handle.position];
        const posIndex = samePositionHandles.indexOf(handle);
        const total = samePositionHandles.length;

        const defaultStyle =
          handle.position === Position.Left || handle.position === Position.Right
            ? { top: `${((posIndex + 1) / (total + 1)) * 100}%` }
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
