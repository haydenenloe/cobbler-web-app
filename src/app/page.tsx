'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NetworkGraph from '@/components/NetworkGraph';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in (using localStorage)
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/signin');
    } else {
      setUser(JSON.parse(userData));
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col h-screen">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Contact Network
              </h1>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">User:</span> {user?.username || 'Demo User'}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {user?.email || 'demo@example.com'}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  // TODO: Implement CSV import
                  alert('CSV import functionality coming soon!');
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                Import Contacts
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  router.push('/auth/signin');
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 relative">
        <NetworkGraph />
      </div>
    </main>
  );
} 