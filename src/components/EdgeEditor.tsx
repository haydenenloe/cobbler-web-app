'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { NetworkEdge } from "@/types/network";

interface EdgeEditorProps {
  edge: NetworkEdge | null;
  onClose: () => void;
  onUpdate: (edge: NetworkEdge) => void;
  onDelete: (edge: NetworkEdge) => void;
}

export function EdgeEditor({ edge, onClose, onUpdate, onDelete }: EdgeEditorProps) {
  if (!edge) return null;

  const handleStrengthChange = () => {
    const newStrength = edge.data.strength === 'weak' ? 'strong' : 'weak';
    onUpdate({
      ...edge,
      data: {
        ...edge.data,
        strength: newStrength,
      },
    });
  };

  const handleDelete = () => {
    onDelete(edge);
    onClose();
  };

  return (
    <Dialog open={!!edge} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Connection</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">Connection Strength</h3>
            <p className="text-sm text-gray-500">
              Current: {edge.data.strength === 'weak' ? 'Weak' : 'Strong'}
            </p>
            <Button
              variant="outline"
              onClick={handleStrengthChange}
              className="mt-2"
            >
              Change to {edge.data.strength === 'weak' ? 'Strong' : 'Weak'}
            </Button>
          </div>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="w-full"
          >
            Delete Connection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 