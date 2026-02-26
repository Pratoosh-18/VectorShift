import { getBezierPath, BaseEdge } from 'reactflow';
import { useStore } from '../store/useStore';

export const DeletableEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerEnd,
  animated,
}) => {
  const removeEdge = useStore((s) => s.removeEdge);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={style}
        className={animated ? 'react-flow__edge-path animated' : 'react-flow__edge-path'}
      />
      <foreignObject
        width={24}
        height={24}
        x={labelX - 12}
        y={labelY - 12}
        requiredExtensions="http://www.w3.org/1999/xhtml"
        className="edge-delete-fo"
      >
        <button
          className="edge-delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            removeEdge(id);
          }}
          title="Remove connection"
        >
          ✕
        </button>
      </foreignObject>
    </>
  );
};
