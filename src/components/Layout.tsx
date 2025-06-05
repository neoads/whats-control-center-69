
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
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header onMenuClick={handleMenuClick} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
