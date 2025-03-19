'use client';

import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Contact {
  id: string;
  name: string;
  title?: string;
  company?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  notes?: string;
  relationship_strength: number;
  tags?: string[];
  last_interaction_date?: string;
  next_interaction_date?: string;
  reminders?: string[];
}

interface ContactDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: string) => void;
}

export default function ContactDetailsModal({
  isOpen,
  onClose,
  contact,
  onEdit,
  onDelete,
}: ContactDetailsModalProps) {
  const [newTag, setNewTag] = useState('');
  const [newReminder, setNewReminder] = useState('');

  if (!contact) return null;

  const handleAddTag = () => {
    if (newTag.trim()) {
      const updatedContact = {
        ...contact,
        tags: [...(contact.tags || []), newTag.trim()],
      };
      onEdit(updatedContact);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedContact = {
      ...contact,
      tags: contact.tags?.filter(tag => tag !== tagToRemove),
    };
    onEdit(updatedContact);
  };

  const handleAddReminder = () => {
    if (newReminder.trim()) {
      const updatedContact = {
        ...contact,
        reminders: [...(contact.reminders || []), newReminder.trim()],
      };
      onEdit(updatedContact);
      setNewReminder('');
    }
  };

  const handleRemoveReminder = (reminderToRemove: string) => {
    const updatedContact = {
      ...contact,
      reminders: contact.reminders?.filter(reminder => reminder !== reminderToRemove),
    };
    onEdit(updatedContact);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl rounded bg-white p-6">
          <div className="flex justify-between items-start mb-4">
            <Dialog.Title className="text-xl font-semibold">
              Contact Details
            </Dialog.Title>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(contact)}
                className="p-2 text-gray-500 hover:text-blue-500"
                title="Edit contact"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(contact.id)}
                className="p-2 text-gray-500 hover:text-red-500"
                title="Delete contact"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-sm text-gray-900">{contact.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <p className="mt-1 text-sm text-gray-900">{contact.title || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <p className="mt-1 text-sm text-gray-900">{contact.company || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{contact.email || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="mt-1 text-sm text-gray-900">{contact.phone || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                  <p className="mt-1 text-sm text-gray-900">{contact.linkedin || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {contact.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                <button
                  onClick={handleAddTag}
                  className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Interaction History</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Interaction</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {contact.last_interaction_date 
                      ? new Date(contact.last_interaction_date).toLocaleDateString()
                      : 'No interactions yet'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Next Interaction</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {contact.next_interaction_date 
                      ? new Date(contact.next_interaction_date).toLocaleDateString()
                      : 'No upcoming interactions'}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Reminders</h3>
              <div className="space-y-2 mb-2">
                {contact.reminders?.map((reminder) => (
                  <div key={reminder} className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">{reminder}</span>
                    <button
                      onClick={() => handleRemoveReminder(reminder)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newReminder}
                  onChange={(e) => setNewReminder(e.target.value)}
                  placeholder="Add a reminder"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                <button
                  onClick={handleAddReminder}
                  className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Notes</h3>
              <p className="text-sm text-gray-900 whitespace-pre-wrap">
                {contact.notes || 'No notes available'}
              </p>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 