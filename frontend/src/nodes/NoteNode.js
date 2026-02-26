import React, { useState, useRef } from 'react';
import { X, GripVertical } from 'lucide-react';
import { Bold, Italic, Underline } from 'lucide-react';
import { useStore } from '../store/useStore';

const NOTE_COLORS = [
  { value: '#AACFF9', label: 'Light blue' },
  { value: '#fef3c7', label: 'Yellow' },
  { value: '#dbeafe', label: 'Blue' },
  { value: '#dcfce7', label: 'Green' },
  { value: '#fce7f3', label: 'Pink' },
  { value: '#f3e8ff', label: 'Purple' },
];

export const NoteNode = ({ id }) => {
  const removeNode = useStore((s) => s.removeNode);
  const [color, setColor] = useState('#AACFF9');
  const [isFocused, setIsFocused] = useState(false);
  const contentRef = useRef(null);

  const applyFormat = (cmd) => {
    document.execCommand(cmd, false, null);
    contentRef.current?.focus();
  };

  return (
    <div className="note-node-card">
      {/* Background color applied here so it always works */}
      <div className="note-node-card-bg" style={{ backgroundColor: color }}>
        {/* Top-right: delete (cross) on top, draggable grip below */}
        <div className="note-node-actions">
          <button
            type="button"
            className="note-node-delete nodrag"
            onClick={(e) => { e.stopPropagation(); removeNode(id); }}
            onMouseDown={(e) => e.stopPropagation()}
            title="Delete node"
          >
            <X size={12} strokeWidth={2.5} />
          </button>
          <div className="note-drag-handle" title="Drag to move">
            <GripVertical size={14} />
          </div>
        </div>

          {isFocused && (
            <div
              className="note-format-toolbar nodrag"
              onMouseDown={(e) => e.preventDefault()}
            >
              <div className="note-toolbar-colors">
                {NOTE_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    className={`note-swatch ${color === c.value ? 'active' : ''}`}
                    style={{ backgroundColor: c.value }}
                    onClick={(e) => { e.stopPropagation(); setColor(c.value); }}
                    title={c.label}
                  />
                ))}
              </div>
              <span className="note-toolbar-divider" />
              <button type="button" className="note-toolbar-btn" onClick={() => applyFormat('bold')} title="Bold">
                <Bold size={16} />
              </button>
              <button type="button" className="note-toolbar-btn" onClick={() => applyFormat('italic')} title="Italic">
                <Italic size={16} />
              </button>
              <button type="button" className="note-toolbar-btn" onClick={() => applyFormat('underline')} title="Underline">
                <Underline size={16} />
              </button>
            </div>
          )}

          <div
            ref={contentRef}
            className="note-content-editable nodrag"
            contentEditable
            suppressContentEditableWarning
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onMouseDown={(e) => e.stopPropagation()}
            onDragStart={(e) => e.stopPropagation()}
            data-placeholder="Sample notes"
          />
      </div>
    </div>
  );
};
