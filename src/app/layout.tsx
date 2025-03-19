import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthenticatedLayout from '@/components/Layout/AuthenticatedLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cobbler - Professional Network Visualization',
  description: 'Visualize and manage your professional network with Cobbler.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthenticatedLayout>
          {children}
        </AuthenticatedLayout>
      </body>
    </html>
  );
} 