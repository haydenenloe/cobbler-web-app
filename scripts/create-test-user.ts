import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mlyzjtiklpaxjvtkkcmy.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  throw new Error('Missing SUPABASE_ANON_KEY');
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestUser() {
  const email = 'test@example.com';
  const password = 'test123456';

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Error creating test user:', error.message);
      return;
    }

    console.log('Test user created successfully:', {
      id: data.user?.id,
      email: data.user?.email,
    });
    
    console.log('\nYou can now sign in with:');
    console.log('Email:', email);
    console.log('Password:', password);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createTestUser(); 