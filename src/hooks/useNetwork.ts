'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Contact, NetworkNode, NetworkEdge } from '@/types/network';

export function useNetwork() {
  const { user, supabase } = useAuth();
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [edges, setEdges] = useState<NetworkEdge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Fetch user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError.message);
          throw profileError;
        }

        // Fetch all contacts including user profile
        const { data: contacts, error: contactsError } = await supabase
          .from('contacts')
          .select('*')
          .eq('user_id', user.id);

        if (contactsError) {
          console.error('Error fetching contacts:', contactsError.message);
          throw contactsError;
        }

        // Fetch connections
        const { data: connections, error: connectionsError } = await supabase
          .from('connections')
          .select('*')
          .eq('user_id', user.id);

        if (connectionsError) {
          console.error('Error fetching connections:', connectionsError.message);
          throw connectionsError;
        }

        // Find or create user profile contact
        let userProfileContact = contacts?.find(c => c.is_user_profile);
        if (!userProfileContact) {
          // Create user profile contact if it doesn't exist
          const { data: newUserContact, error: createError } = await supabase
            .from('contacts')
            .insert({
              user_id: user.id,
              name: profile.full_name || user.email?.split('@')[0] || 'Your Name',
              company: profile.company || '',
              title: profile.title || '',
              email: user.email || '',
              phone: '',
              linkedin: '',
              notes: profile.bio || '',
              last_interaction_date: new Date().toISOString(),
              relationship_strength: 'strong',
              tags: ['Me'],
              is_user_profile: true,
            })
            .select()
            .single();

          if (createError) throw createError;
          userProfileContact = newUserContact;
        }

        // Transform contacts into nodes
        const contactNodes: NetworkNode[] = contacts
          .filter(contact => !contact.is_user_profile) // Exclude user profile from regular contacts
          .map((contact, index) => {
            // Calculate position in a circular layout
            const angle = (index * 2 * Math.PI) / Math.max(contacts.length - 1, 1);
            const radius = 200; // Distance from center
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            return {
              id: contact.id,
              type: 'contact',
              position: { x, y },
              data: {
                id: contact.id,
                userId: contact.user_id,
                name: contact.name,
                company: contact.company || '',
                title: contact.title || '',
                email: contact.email || '',
                phone: contact.phone || '',
                linkedin: contact.linkedin || '',
                notes: contact.notes || '',
                lastInteractionDate: contact.last_interaction_date || new Date().toISOString(),
                relationshipStrength: contact.relationship_strength || 'weak',
                tags: contact.tags || [],
              },
            };
          });

        // Create user node
        const userNode: NetworkNode = {
          id: userProfileContact.id,
          type: 'contact',
          position: { x: 0, y: 0 },
          data: {
            id: userProfileContact.id,
            userId: userProfileContact.user_id,
            name: userProfileContact.name,
            company: userProfileContact.company || '',
            title: userProfileContact.title || '',
            email: userProfileContact.email || '',
            phone: userProfileContact.phone || '',
            linkedin: userProfileContact.linkedin || '',
            notes: userProfileContact.notes || '',
            lastInteractionDate: userProfileContact.last_interaction_date,
            relationshipStrength: userProfileContact.relationship_strength || 'strong',
            tags: userProfileContact.tags || ['Me'],
          },
        };

        // Transform connections into edges
        const networkEdges: NetworkEdge[] = connections.map((connection) => ({
          id: connection.id,
          source: connection.source_id,
          target: connection.target_id,
          type: 'smoothstep',
          data: {
            strength: connection.strength,
          },
        }));

        console.log('Setting initial data:', {
          nodes: [userNode, ...contactNodes],
          edges: networkEdges,
        });

        setNodes([userNode, ...contactNodes]);
        setEdges(networkEdges);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error : new Error('Failed to fetch data'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, supabase]);

  // Create a new contact
  const createContact = async (contact: Omit<Contact, 'id' | 'userId'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      // Validate required fields
      if (!contact.name) {
        throw new Error('Contact name is required');
      }

      // Prepare the contact data
      const contactData = {
        user_id: user.id,
        name: contact.name,
        company: contact.company || '',
        title: contact.title || '',
        email: contact.email || '',
        phone: contact.phone || '',
        linkedin: contact.linkedin || '',
        notes: contact.notes || '',
        last_interaction_date: contact.lastInteractionDate || new Date().toISOString(),
        tags: contact.tags || [],
      };

      console.log('Raw contact data:', contact);
      console.log('Prepared contact data for Supabase:', contactData);

      // First, check if the contacts table exists and its structure
      const { data: tableInfo, error: tableError } = await supabase
        .from('contacts')
        .select('*')
        .limit(1);

      if (tableError) {
        console.error('Error checking contacts table:', tableError);
        throw new Error(`Database error: ${tableError.message}`);
      }

      console.log('Contacts table structure:', tableInfo ? 'Table exists' : 'No data in table');

      // Attempt to insert the contact
      const { data, error } = await supabase
        .from('contacts')
        .insert(contactData)
        .select()
        .single();

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          statusCode: error.code,
        });
        throw new Error(`Failed to create contact: ${error.message}`);
      }

      if (!data) {
        console.error('No data returned from Supabase insert');
        throw new Error('Failed to create contact: No data returned');
      }

      console.log('Successfully created contact:', data);

      const newContact: Contact = {
        id: data.id,
        userId: data.user_id,
        name: data.name,
        company: data.company || '',
        title: data.title || '',
        email: data.email || '',
        phone: data.phone || '',
        linkedin: data.linkedin || '',
        notes: data.notes || '',
        lastInteractionDate: data.last_interaction_date,
        relationshipStrength: 'weak', // Default value since it's not in the database
        tags: data.tags || [],
      };

      // Calculate position for the new contact
      const existingContacts = nodes.filter(node => node.id !== user.id);
      const angle = (existingContacts.length * 2 * Math.PI) / Math.max(existingContacts.length + 1, 1);
      const radius = 200;
      const position = {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
      };

      setNodes((prev) => [...prev, {
        id: newContact.id,
        type: 'contact',
        position,
        data: newContact,
      }]);

      return newContact;
    } catch (err) {
      console.error('Error creating contact:', err);
      if (err instanceof Error) {
        console.error('Error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack,
        });
      }
      setError(err instanceof Error ? err : new Error('Failed to create contact'));
      throw err;
    }
  };

  // Update an existing contact
  const updateContact = async (contact: Contact) => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .update({
          name: contact.name,
          company: contact.company,
          title: contact.title,
          email: contact.email,
          phone: contact.phone,
          linkedin: contact.linkedin,
          notes: contact.notes,
          last_interaction_date: contact.lastInteractionDate,
          relationship_strength: contact.relationshipStrength,
          tags: contact.tags,
        })
        .eq('id', contact.id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to update contact');

      const updatedContact: Contact = {
        id: data.id,
        userId: data.user_id,
        name: data.name,
        company: data.company,
        title: data.title,
        email: data.email,
        phone: data.phone,
        linkedin: data.linkedin,
        notes: data.notes,
        lastInteractionDate: data.last_interaction_date,
        relationshipStrength: data.relationship_strength,
        tags: data.tags,
      };

      setNodes((prev) =>
        prev.map((node) =>
          node.id === contact.id
            ? {
                ...node,
                data: updatedContact,
              }
            : node
        )
      );

      return updatedContact;
    } catch (err) {
      console.error('Error updating contact:', err);
      setError(err instanceof Error ? err : new Error('Failed to update contact'));
      throw err;
    }
  };

  // Delete a contact
  const deleteContact = async (contactId: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', contactId);

      if (error) throw error;

      setNodes((prev) => prev.filter((node) => node.id !== contactId));
      setEdges((prev) =>
        prev.filter(
          (edge) => edge.source !== contactId && edge.target !== contactId
        )
      );
    } catch (err) {
      console.error('Error deleting contact:', err);
      setError(err instanceof Error ? err : new Error('Failed to delete contact'));
      throw err;
    }
  };

  // Create a new connection
  const createConnection = useCallback(
    async (edge: NetworkEdge) => {
      console.log('Creating connection:', edge);

      try {
        // Validate source and target
        const sourceNode = nodes.find((n) => n.id === edge.source);
        const targetNode = nodes.find((n) => n.id === edge.target);

        if (!sourceNode || !targetNode) {
          console.error('Source or target node not found:', {
            source: edge.source,
            target: edge.target,
          });
          return;
        }

        // Prevent self-connections
        if (edge.source === edge.target) {
          console.log('Preventing self-connection');
          return;
        }

        // Check if connection already exists
        const existingConnection = edges.find(
          (c) =>
            (c.source === edge.source && c.target === edge.target) ||
            (c.source === edge.target && c.target === edge.source)
        );

        if (existingConnection) {
          console.log('Connection already exists:', existingConnection);
          return;
        }

        // Create connection in database
        const { data, error } = await supabase
          .from('connections')
          .insert({
            user_id: user?.id,
            source_id: edge.source,
            target_id: edge.target,
            strength: edge.data.strength,
          })
          .select()
          .single();

        if (error) {
          console.error('Error creating connection:', error);
          throw error;
        }

        // Update UI with the new connection
        setEdges((prev) => [...prev, data]);

        console.log('Connection created successfully:', data);
      } catch (error) {
        console.error('Failed to create connection:', error);
        throw error;
      }
    },
    [nodes, edges, user, supabase]
  );

  // Update an existing connection
  const updateConnection = useCallback(
    async (edge: NetworkEdge) => {
      console.log('Updating connection:', edge);

      // Don't update temporary edges
      if (edge.id.startsWith('temp-')) {
        console.log('Skipping update for temporary edge:', edge.id);
        return;
      }

      try {
        // Find the connection to update
        const connection = edges.find(
          (c) => c.id === edge.id
        );

        if (!connection) {
          console.error('Connection not found:', edge.id);
          return;
        }

        // Optimistic UI update
        setEdges((prev) =>
          prev.map((c) =>
            c.id === edge.id
              ? {
                  ...c,
                  source: edge.source,
                  target: edge.target,
                  data: { ...c.data, strength: edge.data.strength },
                }
              : c
          )
        );

        // Update in database
        const { error } = await supabase
          .from('connections')
          .update({
            source_id: edge.source,
            target_id: edge.target,
            strength: edge.data.strength,
            updated_at: new Date().toISOString(),
          })
          .eq('id', edge.id);

        if (error) {
          console.error('Error updating connection:', error);
          // Revert optimistic update
          setEdges((prev) =>
            prev.map((c) =>
              c.id === edge.id
                ? {
                    ...c,
                    source: connection.source,
                    target: connection.target,
                    data: { ...c.data, strength: connection.data.strength },
                  }
                : c
            )
          );
          throw error;
        }

        console.log('Connection updated successfully');
      } catch (error) {
        console.error('Failed to update connection:', error);
        throw error;
      }
    },
    [edges, supabase]
  );

  // Delete a connection
  const deleteConnection = useCallback(
    async (edge: NetworkEdge) => {
      console.log('Deleting connection:', edge);

      // Don't delete temporary edges
      if (edge.id.startsWith('temp-')) {
        console.log('Skipping deletion for temporary edge:', edge.id);
        return;
      }

      try {
        // Optimistic UI update
        setEdges((prev) => prev.filter((c) => c.id !== edge.id));

        // Delete from database
        const { error } = await supabase
          .from('connections')
          .delete()
          .eq('id', edge.id);

        if (error) {
          console.error('Error deleting connection:', error);
          // Revert optimistic update
          const connection = edges.find((c) => c.id === edge.id);
          if (connection) {
            setEdges((prev) => [...prev, connection]);
          }
          throw error;
        }

        console.log('Connection deleted successfully');
      } catch (error) {
        console.error('Failed to delete connection:', error);
        throw error;
      }
    },
    [edges, supabase]
  );

  return {
    nodes,
    edges,
    loading,
    error,
    setNodes,
    setEdges,
    createContact,
    updateContact,
    deleteContact,
    createConnection,
    updateConnection,
    deleteConnection,
  };
} 