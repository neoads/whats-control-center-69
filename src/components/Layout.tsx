
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('Verificando autenticação...');
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      console.log('Status de login no localStorage:', isLoggedIn);
      
      if (isLoggedIn === 'true') {
        console.log('Usuário autenticado');
        setIsAuthenticated(true);
      } else {
        console.log('Usuário não autenticado, redirecionando para login');
        navigate('/login', { replace: true });
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate, location.pathname]);

  // Adicionar listener para mudanças no localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn !== 'true') {
        setIsAuthenticated(false);
        navigate('/login', { replace: true });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [navigate]);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-foreground">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
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
