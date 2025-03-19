import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Database types based on our schema
export type Tables = {
  profiles: {
    id: string;
    username: string;
    full_name: string;
    password: string;
    created_at: string;
  };
  contacts: {
    id: string;
    user_id: string;
    name: string;
    company?: string;
    title?: string;
    email?: string;
    phone?: string;
    linkedin?: string;
    notes?: string;
    relationship_strength: number;
    last_interaction_date?: string;
    created_at: string;
    updated_at: string;
  };
  connections: {
    id: string;
    user_id: string;
    source_id: string;
    target_id: string;
    strength: number;
    created_at: string;
    updated_at: string;
  };
}; 