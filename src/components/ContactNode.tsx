"use client";

import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { UserCircleIcon } from "@heroicons/react/24/solid";

interface ContactNodeData {
  id: string;
  name: string;
  title?: string;
  company?: string;
  email?: string;
  relationship_strength: number;
  onConnect?: (contact: ContactNodeData) => void;
  isConnectable?: boolean;
  onClick?: (contact: ContactNodeData) => void;
}

const ContactNode = memo(({ data }: { data: ContactNodeData }) => {
  const {
    name,
    title,
    company,
    relationship_strength,
    onConnect,
    isConnectable,
    onClick,
  } = data;

  return (
    <div
      className={`relative px-4 py-2 shadow-lg rounded-lg border-2 cursor-pointer ${
        relationship_strength === 3
          ? "border-green-500 bg-green-50"
          : relationship_strength === 2
          ? "border-yellow-500 bg-yellow-50"
          : "border-red-500 bg-red-50"
      }`}
      onClick={() => onClick?.(data)}
    >
      <Handle type="source" position={Position.Left} className="w-2 h-2" />
      <Handle type="target" position={Position.Left} className="w-2 h-2" />

      <div className="flex items-center space-x-2">
        {/* <UserCircleIcon className="w-6 h-6 text-gray-500" /> */}
        <img
          src="https://i.postimg.cc/qNSCTGFX/5.png"
          alt=""
          style={{ height: 30 }}
        />
        <div>
          <div className="font-medium text-sm">{name}</div>
          {title && <div className="text-xs text-gray-500">{title}</div>}
          {company && <div className="text-xs text-gray-500">{company}</div>}
        </div>
      </div>

      {onConnect && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onConnect(data);
          }}
          className={`absolute top-1 right-1 p-1 ${
            isConnectable
              ? "text-gray-500 hover:text-green-500"
              : "text-gray-300 cursor-not-allowed"
          }`}
          title={
            isConnectable ? "Connect to this contact" : "Cannot connect to self"
          }
          disabled={!isConnectable}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
});

ContactNode.displayName = "ContactNode";

export default ContactNode;
