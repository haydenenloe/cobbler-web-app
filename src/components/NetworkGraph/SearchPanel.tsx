'use client';

import React, { useState, useCallback } from 'react';
import { ContactNode } from '@/types/network';

interface SearchPanelProps {
  nodes: ContactNode[];
  setNodes: (nodes: ContactNode[]) => void;
}

export default function SearchPanel({ nodes, setNodes }: SearchPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get unique tags from all nodes
  const allTags = Array.from(
    new Set(nodes.flatMap((node) => node.data.tags))
  ).sort();

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      const lowercaseTerm = term.toLowerCase();

      setNodes(
        nodes.map((node) => ({
          ...node,
          hidden: Boolean(
            term &&
            !node.data.name.toLowerCase().includes(lowercaseTerm) &&
            !node.data.company.toLowerCase().includes(lowercaseTerm) &&
            !node.data.title.toLowerCase().includes(lowercaseTerm)
          ),
        }))
      );
    },
    [nodes, setNodes]
  );

  const handleTagFilter = useCallback(
    (tag: string | null) => {
      setSelectedTag(tag);

      setNodes(
        nodes.map((node) => ({
          ...node,
          hidden: tag ? !node.data.tags.includes(tag) : false,
        }))
      );
    },
    [nodes, setNodes]
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg space-y-4">
      <div>
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by tag</label>
        <select
          value={selectedTag || ''}
          onChange={(e) => handleTagFilter(e.target.value || null)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
} 