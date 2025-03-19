'use client';

import React from 'react';
import { Contact } from '@/types/network';
import { XMarkIcon, PencilIcon } from '@heroicons/react/24/outline';

interface ContactDetailsProps {
  contact: Contact;
  onClose: () => void;
  onEdit: () => void;
}

export default function ContactDetails({ contact, onClose, onEdit }: ContactDetailsProps) {
  return (
    <div className="absolute top-4 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold">{contact.name}</h2>
            <p className="text-gray-600">{contact.title}</p>
            <p className="text-gray-500">{contact.company}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <PencilIcon className="w-6 h-6 text-gray-500" />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Contact Information */}
          <div>
            <h3 className="font-semibold mb-2">Contact Information</h3>
            {contact.email && (
              <p className="text-sm">
                <span className="text-gray-500">Email:</span> {contact.email}
              </p>
            )}
            {contact.phone && (
              <p className="text-sm">
                <span className="text-gray-500">Phone:</span> {contact.phone}
              </p>
            )}
            {contact.linkedin && (
              <div className="flex items-center space-x-2">
                <div className="text-gray-500">LinkedIn:</div>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {contact.linkedin}
                </a>
              </div>
            )}
          </div>

          {/* Tags */}
          {contact.tags && contact.tags.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {contact.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <h3 className="font-semibold mb-2">Notes</h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {contact.notes}
            </p>
          </div>

          {/* Last Interaction */}
          {contact.lastInteractionDate && (
            <div className="flex items-center space-x-2">
              <div className="text-gray-500">Last Interaction:</div>
              <div>
                {new Date(contact.lastInteractionDate).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 