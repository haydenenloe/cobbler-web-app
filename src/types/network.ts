// import type { Node, Edge } from 'reactflow';
import type { User as SupabaseUser } from "@supabase/supabase-js";

export type RelationshipStrength = 1 | 2 | 3 | 4 | 5;

export interface User {
  id: string;
  username: string;
  full_name: string;
  created_at?: string;
}

export interface Contact {
  id: string;
  name: string;
  title?: string;
  company?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  notes?: string;
  relationship_strength: RelationshipStrength;
  position_x?: number;
  position_y?: number;
}

export interface ContactConnection {
  id: string;
  source_contact_id: string;
  target_contact_id: string;
  relationship_strength: RelationshipStrength;
  notes?: string;
}

export interface NetworkNode {
  id: string;
  type: "user" | "contact";
  position: {
    x: number;
    y: number;
  };
  data: SupabaseUser | Contact;
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  type: "smoothstep" | "bezier";
  style?: {
    stroke?: string;
    strokeWidth?: number;
  };
  animated?: boolean;
  data: {
    strength: RelationshipStrength;
  };
}

export interface NetworkGraphProps {
  user: SupabaseUser;
}

export interface ContactNodeData extends Contact {
  onEdit?: (contact: Contact) => void;
  onDelete?: () => void;
  onConnect?: (contact: Contact) => void;
  isConnectable?: boolean;
}
