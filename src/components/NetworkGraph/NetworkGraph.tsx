"use client";

import React, { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  EdgeTypes,
  Connection,
  Edge,
  useNodesState,
  useEdgesState,
  Panel,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  NetworkState,
  ContactNodeData,
  ContactEdgeData,
} from "@/types/network";
import ContactNodeComponent from "./ContactNode";
import NetworkEdge from "./NetworkEdge";
import SearchPanel from "./SearchPanel";
import ContactModal from "./ContactModal";

const nodeTypes: NodeTypes = {
  contact: ContactNodeComponent,
};

const edgeTypes: EdgeTypes = {
  contact: NetworkEdge,
};

interface NetworkGraphProps {
  initialData: NetworkState;
}

export default function NetworkGraph({ initialData }: NetworkGraphProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<ContactNodeData>(
    initialData.nodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState<ContactEdgeData>(
    initialData.edges
  );
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => {
        const newEdge: Edge<ContactEdgeData> = {
          ...connection,
          id: `${connection.source}-${connection.target}`,
          source: connection.source || "",
          target: connection.target || "",
          type: "contact",
          data: {
            relationshipStrength: "weak",
          },
        };
        return [...eds, newEdge];
      });
    },
    [setEdges]
  );

  const handleNodeClick = (
    _: React.MouseEvent,
    node: Node<ContactNodeData>
  ) => {
    setSelectedContact(node.id);
  };

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Panel position="top-left">
          <SearchPanel nodes={nodes} setNodes={setNodes} />
        </Panel>
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>

      {selectedContact && (
        <ContactModal
          contactId={selectedContact}
          nodes={nodes}
          setNodes={setNodes}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </div>
  );
}
