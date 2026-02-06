import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-rs-darker">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-rs-dark">
          {children}
        </main>
      </div>
    </div>
  );
}
