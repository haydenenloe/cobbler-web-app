'use client';

import React, { useCallback, useEffect, useState, useMemo } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Node,
  Edge,
  applyNodeChanges,
  ReactFlowProvider,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import UserNode from './UserNode';
import ContactNode from './ContactNode';
import { PlusIcon } from '@heroicons/react/24/solid';
import AddContactModal from '@/components/AddContactModal';
import ContactDetailsModal from '@/components/ContactDetailsModal';

const nodeTypes = {
  user: UserNode,
  contact: ContactNode,
};

// Dummy data
const DUMMY_CONTACTS = [
  {
    id: '1',
    name: 'John Doe',
    title: 'Software Engineer',
    company: 'Tech Corp',
    email: 'john@techcorp.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'https://linkedin.com/in/johndoe',
    notes: 'Met at the tech conference last year. Great conversation about AI and machine learning.',
    relationship_strength: 3,
    position_x: 300,
    position_y: 200,
    last_interaction_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    next_interaction_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Tech Corp', 'AI', 'Engineering'],
    reminders: ['Follow up on AI project proposal', 'Schedule coffee meeting'],
  },
  {
    id: '2',
    name: 'Jane Smith',
    title: 'Product Manager',
    company: 'Innovation Inc',
    email: 'jane@innovation.com',
    phone: '+1 (555) 234-5678',
    linkedin: 'https://linkedin.com/in/janesmith',
    notes: 'Former colleague from previous company. Great product sense and leadership skills.',
    relationship_strength: 4,
    position_x: 500,
    position_y: 200,
    last_interaction_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    next_interaction_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Innovation Inc', 'Product', 'Leadership'],
    reminders: ['Review product roadmap', 'Send meeting notes'],
  },
  {
    id: '3',
    name: 'Mike Johnson',
    title: 'Designer',
    company: 'Creative Co',
    email: 'mike@creative.com',
    phone: '+1 (555) 345-6789',
    linkedin: 'https://linkedin.com/in/mikejohnson',
    notes: 'Met at a design workshop. Very talented UI/UX designer with great portfolio.',
    relationship_strength: 2,
    position_x: 400,
    position_y: 400,
    last_interaction_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    next_interaction_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Creative Co', 'Design', 'UI/UX'],
    reminders: ['Review portfolio updates', 'Discuss potential collaboration'],
  },
];

const DUMMY_CONNECTIONS = [
  {
    id: '1-2',
    source_contact_id: '1',
    target_contact_id: '2',
    relationship_strength: 3,
  },
  {
    id: '2-3',
    source_contact_id: '2',
    target_contact_id: '3',
    relationship_strength: 2,
  },
];

function NetworkGraphContent() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [contacts, setContacts] = useState(DUMMY_CONTACTS);
  const [connections, setConnections] = useState(DUMMY_CONNECTIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [isCreatingConnection, setIsCreatingConnection] = useState(false);
  const [connectionSource, setConnectionSource] = useState<any | null>(null);

  useEffect(() => {
    // Create nodes array with user at center and contacts in a circle
    const userNode: Node = {
      id: 'user-1',
      type: 'user',
      position: { x: 400, y: 300 },
      data: {
        id: 'user-1',
        username: 'Demo User',
        email: 'demo@example.com',
      },
    };

    const contactNodes: Node[] = contacts.map((contact) => ({
      id: contact.id,
      type: 'contact',
      position: { x: contact.position_x, y: contact.position_y },
      data: {
        ...contact,
        onConnect: isCreatingConnection ? handleConnectionTarget : undefined,
        isConnectable: isCreatingConnection && connectionSource?.id !== contact.id,
        onClick: handleContactClick,
      },
    }));

    // Create edges for user-to-contact connections
    const userEdges: Edge[] = contacts.map((contact) => ({
      id: `user-${contact.id}`,
      source: 'user-1',
      target: contact.id,
      type: 'default',
      style: {
        stroke: contact.relationship_strength === 3 ? '#22c55e' : 
               contact.relationship_strength === 2 ? '#f59e0b' : '#ef4444',
        strokeWidth: 2,
        strokeDasharray: '5,5',
      },
      animated: false,
      data: {
        strength: contact.relationship_strength
      }
    }));

    // Create edges for contact-to-contact connections
    const contactEdges: Edge[] = connections.map((connection) => ({
      id: `connection-${connection.id}`,
      source: connection.source_contact_id,
      target: connection.target_contact_id,
      type: 'default',
      style: {
        stroke: connection.relationship_strength === 3 ? '#22c55e' : 
               connection.relationship_strength === 2 ? '#f59e0b' : '#ef4444',
        strokeWidth: 2,
        strokeDasharray: '5,5',
      },
      animated: false,
      data: {
        strength: connection.relationship_strength
      }
    }));

    setNodes([userNode, ...contactNodes]);
    setEdges([...userEdges, ...contactEdges]);
  }, [contacts, connections, isCreatingConnection, connectionSource]);

  const handleContactAdded = useCallback((newContact: any) => {
    setContacts(prev => [...prev, { ...newContact, id: String(prev.length + 1) }]);
    setIsModalOpen(false);
    setSelectedContact(null);
  }, []);

  const handleContactClick = useCallback((contact: any) => {
    setSelectedContact(contact);
    setIsDetailsModalOpen(true);
  }, []);

  const handleEditContact = useCallback((updatedContact: any) => {
    setContacts(prev => prev.map(contact => 
      contact.id === updatedContact.id ? updatedContact : contact
    ));
  }, []);

  const handleDeleteContact = useCallback((contactId: string) => {
    setContacts(prev => prev.filter(c => c.id !== contactId));
    setConnections(prev => prev.filter(c => 
      c.source_contact_id !== contactId && c.target_contact_id !== contactId
    ));
    setIsDetailsModalOpen(false);
    setSelectedContact(null);
  }, []);

  const handleCreateConnection = useCallback((sourceContact: any) => {
    setIsCreatingConnection(true);
    setConnectionSource(sourceContact);
  }, []);

  const handleConnectionTarget = useCallback((targetContact: any) => {
    if (!connectionSource) return;

    const newConnection = {
      id: `${connectionSource.id}-${targetContact.id}`,
      source_contact_id: connectionSource.id,
      target_contact_id: targetContact.id,
      relationship_strength: 3,
    };

    setConnections(prev => [...prev, newConnection]);
    setIsCreatingConnection(false);
    setConnectionSource(null);
  }, [connectionSource]);

  const onNodesChange = useCallback((changes: any[]) => {
    setNodes((nds) => {
      const newNodes = applyNodeChanges(changes, nds);
      
      // Update contact positions
      changes.forEach((change) => {
        if (change.type === 'position' && change.dragging === false) {
          const node = newNodes.find((n) => n.id === change.id);
          if (node && node.type === 'contact') {
            setContacts(prev => prev.map(contact => 
              contact.id === node.id 
                ? { ...contact, position_x: node.position.x, position_y: node.position.y }
                : contact
            ));
          }
        }
      });

      return newNodes;
    });
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        defaultEdgeOptions={{
          type: 'default',
          animated: false,
          style: { strokeWidth: 2, strokeDasharray: '5,5' },
        }}
        fitView
        style={{ width: '100%', height: '100%' }}
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="bottom-right">
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-blue-500 p-3 text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </Panel>
      </ReactFlow>

      <AddContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onContactAdded={handleContactAdded}
        contact={selectedContact}
      />

      <ContactDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedContact(null);
        }}
        contact={selectedContact}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
      />
    </div>
  );
}

export default function NetworkGraph() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlowProvider>
        <NetworkGraphContent />
      </ReactFlowProvider>
    </div>
  );
} 