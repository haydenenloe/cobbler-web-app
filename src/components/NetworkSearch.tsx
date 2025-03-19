'use client';

import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Contact } from '../types';

interface NetworkSearchProps {
  contacts: Contact[];
  onSearch: (results: Contact[]) => void;
}

export default function NetworkSearch({ contacts, onSearch }: NetworkSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get unique tags from all contacts
  const allTags = Array.from(
    new Set(contacts.flatMap((contact) => contact.tags))
  ).sort();

  const handleSearch = () => {
    const results = contacts.filter((contact) => {
      const matchesSearch =
        searchTerm === '' ||
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.title.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => contact.tags.includes(tag));

      return matchesSearch && matchesTags;
    });

    onSearch(results);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  // Trigger search when tags change
  React.useEffect(() => {
    handleSearch();
  }, [selectedTags]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <MagnifyingGlassIcon
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </div>

      {allTags.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by tags:</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 