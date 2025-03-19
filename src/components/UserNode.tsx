'use client';

import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { UserCircleIcon } from '@heroicons/react/24/solid';

interface UserNodeData {
  id: string;
  username: string;
  email: string;
}

const UserNode = memo(({ data }: { data: UserNodeData }) => {
  const { username, email } = data;

  return (
    <div className="relative px-4 py-2 shadow-lg rounded-lg border-2 border-blue-500 bg-blue-50">
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
      <Handle type="target" position={Position.Right} className="w-2 h-2" />
      
      <div className="flex items-center space-x-2">
        <UserCircleIcon className="w-6 h-6 text-blue-500" />
        <div>
          <div className="font-medium text-sm">{username}</div>
          <div className="text-xs text-gray-500">{email}</div>
        </div>
      </div>
    </div>
  );
});

UserNode.displayName = 'UserNode';

export default UserNode; 