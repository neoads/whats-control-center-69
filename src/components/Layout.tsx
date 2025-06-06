
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return null; // O useEffect já está redirecionando
  }

  return (
    <div className="min-h-screen flex w-full bg-[#0D0D0D]">
      {/* Sidebar - Desktop sempre visível */}
      <div className="hidden lg:block">
        <Sidebar isOpen={true} onClose={() => {}} />
      </div>
      
      {/* Sidebar - Mobile com overlay */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={handleSidebarClose}
        />
      )}
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={handleMenuClick} />
        <main className="flex-1 overflow-auto p-6 bg-[#0D0D0D]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
