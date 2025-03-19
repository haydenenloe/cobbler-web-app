'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';

interface UserProfile {
  id: string;
  full_name: string | null;
  company: string | null;
  title: string | null;
  bio: string | null;
}

export default function UserCard() {
  const { user, supabase } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        // First try to fetch the profile
        const { data: existingProfiles, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id);

        if (fetchError) {
          console.error('Error fetching profile:', fetchError.message);
          throw fetchError;
        }

        // If we found a profile, use it
        if (existingProfiles && existingProfiles.length > 0) {
          setProfile(existingProfiles[0]);
        } else {
          // If no profile exists, create one
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              full_name: user.email?.split('@')[0] || null,
              company: null,
              title: null,
              bio: null,
            })
            .select()
            .single();

          if (createError) {
            console.error('Error creating profile:', createError.message);
            throw createError;
          }

          setProfile(newProfile);
        }
      } catch (error) {
        console.error('Error in profile management:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, supabase]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 text-lg font-semibold">
              {profile?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-gray-900 truncate">
            {profile?.full_name || 'Your Name'}
          </h2>
          <p className="text-sm text-gray-500 truncate">
            {profile?.title || 'Your Title'}
          </p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Company:</span>{' '}
          <span>{profile?.company || 'Not specified'}</span>
        </div>
        <div className="text-sm text-gray-600 mt-2">
          <span className="font-medium">Email:</span>{' '}
          <span>{user?.email}</span>
        </div>
        {profile?.bio && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">{profile.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
} 