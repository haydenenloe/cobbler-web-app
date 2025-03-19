import { supabase, Tables } from './supabase';
import { Contact } from '@/types/network';

// Convert database contact to app contact
export function toContact(dbContact: Tables['contacts']): Contact {
  return {
    id: dbContact.id,
    userId: dbContact.user_id,
    name: dbContact.name || '',
    company: dbContact.company || '',
    title: dbContact.title || '',
    email: dbContact.email,
    phone: dbContact.phone,
    linkedin: dbContact.linkedin,
    notes: dbContact.notes || '',
    lastInteractionDate: dbContact.last_interaction_date || new Date().toISOString(),
    relationshipStrength: 'weak', // Default to weak, as this is managed through connections
    tags: dbContact.tags || [],
  };
}

// Convert app contact to database contact
export function toDbContact(contact: Contact): Omit<Tables['contacts'], 'created_at' | 'updated_at'> {
  return {
    id: contact.id,
    user_id: contact.userId,
    name: contact.name,
    company: contact.company || '',
    title: contact.title || '',
    email: contact.email,
    phone: contact.phone,
    linkedin: contact.linkedin,
    notes: contact.notes || '',
    last_interaction_date: contact.lastInteractionDate,
    tags: contact.tags,
  };
}

export async function getContacts(userId: string) {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data.map(toContact);
}

export async function createContact(contact: Omit<Contact, 'id'>) {
  const { data, error } = await supabase
    .from('contacts')
    .insert([toDbContact({ ...contact, id: crypto.randomUUID() })])
    .select()
    .single();

  if (error) throw error;
  return toContact(data);
}

export async function updateContact(contact: Contact) {
  const { data, error } = await supabase
    .from('contacts')
    .update(toDbContact(contact))
    .eq('id', contact.id)
    .select()
    .single();

  if (error) throw error;
  return toContact(data);
}

export async function deleteContact(contactId: string) {
  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', contactId);

  if (error) throw error;
}

export async function getConnections(userId: string) {
  const { data, error } = await supabase
    .from('connections')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data;
}

export async function createConnection(
  userId: string,
  sourceId: string,
  targetId: string,
  strength: 'weak' | 'strong'
) {
  const { data, error } = await supabase
    .from('connections')
    .insert([
      {
        id: crypto.randomUUID(),
        user_id: userId,
        source_id: sourceId,
        target_id: targetId,
        strength,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateConnection(
  connectionId: string,
  strength: 'weak' | 'strong'
) {
  const { data, error } = await supabase
    .from('connections')
    .update({ strength })
    .eq('id', connectionId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteConnection(connectionId: string) {
  const { error } = await supabase
    .from('connections')
    .delete()
    .eq('id', connectionId);

  if (error) throw error;
} 