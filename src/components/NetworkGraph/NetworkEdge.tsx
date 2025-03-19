'use client';

import React, { memo } from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';
import { ContactEdgeData } from '@/types/network';

function NetworkEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps<ContactEdgeData>) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const isStrong = data?.relationshipStrength === 'strong';

  return (
    <path
      id={id}
      className={`react-flow__edge-path transition-all duration-300 ${
        isStrong ? 'stroke-blue-500' : 'stroke-yellow-500'
      }`}
      strokeWidth={isStrong ? 2 : 1}
      d={edgePath}
    />
  );
}

export default memo(NetworkEdge); 