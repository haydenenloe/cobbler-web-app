'use client';

import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { format } from 'date-fns';
import { ContactNode } from '../../types/network';

interface ContactModalProps {
  contactId: string;
  nodes: ContactNode[];
  setNodes: (nodes: ContactNode[]) => void;
  onClose: () => void;
}

export default function ContactModal({ contactId, nodes, setNodes, onClose }: ContactModalProps) {
  const contact = nodes.find((node) => node.id === contactId)?.data;

  if (!contact) return null;

  const handleRelationshipChange = () => {
    setNodes(
      nodes.map((node) => {
        if (node.id === contactId) {
          return {
            ...node,
            data: {
              ...node.data,
              relationshipStrength: node.data.relationshipStrength === 'strong' ? 'weak' : 'strong',
            },
          };
        }
        return node;
      })
    );
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {contact.name}
                </Dialog.Title>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    {contact.title} at {contact.company}
                  </p>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Tags</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {contact.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Relationship</h4>
                    <button
                      onClick={handleRelationshipChange}
                      className={`mt-2 inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium
                        ${
                          contact.relationshipStrength === 'strong'
                            ? 'border-blue-500 text-blue-700 bg-blue-50 hover:bg-blue-100'
                            : 'border-yellow-500 text-yellow-700 bg-yellow-50 hover:bg-yellow-100'
                        }
                      `}
                    >
                      {contact.relationshipStrength === 'strong' ? 'Strong Tie' : 'Weak Tie'}
                    </button>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Last Interaction</h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {format(new Date(contact.lastInteractionDate), 'MMMM d, yyyy')}
                    </p>
                  </div>

                  {contact.notes && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900">Notes</h4>
                      <p className="mt-1 text-sm text-gray-500">{contact.notes}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 