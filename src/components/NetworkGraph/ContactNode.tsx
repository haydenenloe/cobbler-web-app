'use client';

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { format } from 'date-fns';
import { ContactNodeData } from '@/types/network';

function ContactNode({ data }: NodeProps<ContactNodeData>) {
  const { name, company, title, lastInteractionDate, relationshipStrength, tags } = data;

  return (
    <div className={`
      px-4 py-2 shadow-lg rounded-lg border-2
      ${relationshipStrength === 'strong' ? 'border-blue-500 bg-blue-50' : 'border-yellow-500 bg-yellow-50'}
    `}>
      <Handle type="target" position={Position.Top} className="!bg-gray-400" />
      
      <div className="text-sm">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-gray-600">{title}</p>
        <p className="text-gray-500 text-xs">{company}</p>
        
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-white rounded-full text-xs text-gray-600 border border-gray-200"
            >
              {tag}
            </span>
          ))}
          {tags.length > 2 && (
            <span className="px-2 py-0.5 bg-white rounded-full text-xs text-gray-600 border border-gray-200">
              +{tags.length - 2}
            </span>
          )}
        </div>
        
        <div className="mt-2 text-xs text-gray-500">
          Last contact: {format(new Date(lastInteractionDate), 'MMM d, yyyy')}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-gray-400" />
    </div>
  );
}

export default memo(ContactNode); 