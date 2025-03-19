export * from './network';

export type RelationshipStrength = 'strong' | 'weak';

export type Contact = {
  id: string;
  userId: string;
  name: string;
  company?: string;
  title?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  notes?: string;
  lastInteractionDate: string;
  relationshipStrength: 'weak' | 'strong';
  tags: string[];
};

export interface Connection {
  id: string;
  userId: string;
  contactId1: string;
  contactId2: string;
  relationshipStrength: RelationshipStrength;
  sharedConnections?: string[];
  notes?: string;
}

export interface NetworkNode {
  id: string;
  type: 'contact';
  position: {
    x: number;
    y: number;
  };
  data: Contact;
  hidden?: boolean;
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  type: 'smoothstep';
  data: {
    strength: 'weak' | 'strong';
  };
  hidden?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
} 