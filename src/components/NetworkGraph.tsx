"use client";

import React, { useCallback, useEffect, useState, useMemo } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Node,
  Edge,
  applyNodeChanges,
  ReactFlowProvider,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import UserNode from "./UserNode";
import ContactNode from "./ContactNode";
import { PlusIcon } from "@heroicons/react/24/solid";
import AddContactModal from "@/components/AddContactModal";
import ContactDetailsModal from "@/components/ContactDetailsModal";
import { createClient } from "@supabase/supabase-js";

const nodeTypes = {
  user: UserNode,
  contact: ContactNode,
};

const SUPABASE_URL = "https://egkvzlzumfqwcrehtnwi.supabase.co"; // Replace with your actual Supabase URL
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVna3Z6bHp1bWZxd2NyZWh0bndpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0OTAwMTUsImV4cCI6MjA1ODA2NjAxNX0.v3WGPdnOUEmKveX2_DVRqYlOlQvw1dUKiXAS3vPtjgo"; // Replace with your Supabase anon key
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Dummy Connections
const DUMMY_CONNECTIONS = [
  {
    id: "1-2",
    source_contact_id: "1",
    target_contact_id: "2",
    relationship_strength: 3,
  },
  {
    id: "2-3",
    source_contact_id: "2",
    target_contact_id: "3",
    relationship_strength: 2,
  },
];

function NetworkGraphContent() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [contacts, setContacts] = useState([]);
  const [connections, setConnections] = useState(DUMMY_CONNECTIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<unknown | null>(null);
  const [isCreatingConnection, setIsCreatingConnection] = useState(false);
  const [connectionSource, setConnectionSource] = useState<unknown | null>(
    null
  );

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data, error } = await supabase
          .from("contacts")
          .select(
            "id, name, title, company, email, phone, linkedin, notes, relationship_strength, position_x, position_y"
          );

        if (error) throw error;
        if (data) setContacts(data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    // Create nodes array with user at center and contacts in a circle
    const userNode: Node = {
      id: "user-1",
      type: "user",
      position: { x: -200, y: 400 },
      data: {
        id: "user-1",
        username: "Demo User",
        email: "demo@example.com",
      },
    };

    const contactNodes: Node[] = contacts.map((contact) => ({
      id: contact.id,
      type: "contact",
      position: { x: contact.position_x, y: contact.position_y },
      data: {
        ...contact,
        onConnect: isCreatingConnection ? handleConnectionTarget : undefined,
        isConnectable:
          isCreatingConnection && connectionSource?.id !== contact.id,
        onClick: handleContactClick,
      },
    }));

    // Create edges for user-to-contact connections
    const userEdges: Edge[] = contacts.map((contact) => ({
      id: `user-${contact.id}`,
      source: "user-1",
      target: contact.id,
      type: "default",
      style: {
        stroke:
          contact.relationship_strength === 3
            ? "#22c55e"
            : contact.relationship_strength === 2
            ? "#f59e0b"
            : "#ef4444",
        strokeWidth: 2,
        strokeDasharray: "5,5",
      },
      animated: false,
      data: {
        strength: contact.relationship_strength,
      },
    }));

    // Create edges for contact-to-contact connections
    const contactEdges: Edge[] = connections.map((connection) => ({
      id: `connection-${connection.id}`,
      source: connection.source_contact_id,
      target: connection.target_contact_id,
      type: "default",
      style: {
        stroke:
          connection.relationship_strength === 3
            ? "#22c55e"
            : connection.relationship_strength === 2
            ? "#f59e0b"
            : "#ef4444",
        strokeWidth: 2,
        strokeDasharray: "5,5",
      },
      animated: false,
      data: {
        strength: connection.relationship_strength,
      },
    }));

    setNodes([userNode, ...contactNodes]);
    setEdges([...userEdges, ...contactEdges]);
  }, [contacts, connections, isCreatingConnection, connectionSource]);

  const handleContactAdded = useCallback((newContact: unknown) => {
    setContacts((prev) => [
      ...prev,
      { ...newContact, id: String(prev.length + 1) },
    ]);
    setIsModalOpen(false);
    setSelectedContact(null);
  }, []);

  const handleContactClick = useCallback((contact: unknown) => {
    setSelectedContact(contact);
    setIsDetailsModalOpen(true);
  }, []);

  const handleEditContact = useCallback((updatedContact: unknown) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  }, []);

  const handleDeleteContact = useCallback((contactId: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== contactId));
    setConnections((prev) =>
      prev.filter(
        (c) =>
          c.source_contact_id !== contactId && c.target_contact_id !== contactId
      )
    );
    setIsDetailsModalOpen(false);
    setSelectedContact(null);
  }, []);

  const handleCreateConnection = useCallback((sourceContact: unknown) => {
    setIsCreatingConnection(true);
    setConnectionSource(sourceContact);
  }, []);

  const handleConnectionTarget = useCallback(
    (targetContact: unknown) => {
      if (!connectionSource) return;

      const newConnection = {
        id: `${connectionSource.id}-${targetContact.id}`,
        source_contact_id: connectionSource.id,
        target_contact_id: targetContact.id,
        relationship_strength: 3,
      };

      setConnections((prev) => [...prev, newConnection]);
      setIsCreatingConnection(false);
      setConnectionSource(null);
    },
    [connectionSource]
  );

  const onNodesChange = useCallback((changes: unknown[]) => {
    setNodes((nds) => {
      const newNodes = applyNodeChanges(changes, nds);

      // Update contact positions
      changes.forEach((change) => {
        if (change.type === "position" && change.dragging === false) {
          const node = newNodes.find((n) => n.id === change.id);
          if (node && node.type === "contact") {
            setContacts((prev) =>
              prev.map((contact) =>
                contact.id === node.id
                  ? {
                      ...contact,
                      position_x: node.position.x,
                      position_y: node.position.y,
                    }
                  : contact
              )
            );
          }
        }
      });

      return newNodes;
    });
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        defaultEdgeOptions={{
          type: "default",
          animated: false,
          style: { strokeWidth: 2, strokeDasharray: "5,5" },
        }}
        fitView
        style={{ width: "100%", height: "100%" }}
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
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlowProvider>
        <NetworkGraphContent />
      </ReactFlowProvider>
    </div>
  );
}
