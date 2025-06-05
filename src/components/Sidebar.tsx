
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, Phone, FolderOpen, Users, Shield, Activity, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3, description: 'Visão geral' },
  { name: 'Números', href: '/numeros', icon: Phone, description: 'Gestão de linhas' },
  { name: 'Projetos', href: '/projetos', icon: FolderOpen, description: 'Organizar por projeto' },
  { name: 'Usuários', href: '/usuarios', icon: Users, description: 'Equipe e permissões' },
  { name: 'Segurança', href: '/seguranca', icon: Shield, description: 'Configurações' },
  { name: 'Aquecimento', href: '/aquecimento', icon: Activity, description: 'Preparar números' },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    toast.success('Logout realizado com sucesso!', {
      className: 'warion-toast'
    });
    navigate('/login');
  };

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.div 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border lg:relative lg:translate-x-0
        `}
        initial={false}
        animate={{ 
          x: isOpen ? 0 : '-100%' 
        }}
        transition={{ 
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        <div className="flex flex-col h-full">
          {/* WARION Logo */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl overflow-hidden">
              <img 
                src="/lovable-uploads/ce0047c6-a677-4884-947a-3a6b13a5aa8f.png" 
                alt="WARION Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-display font-bold text-sidebar-foreground tracking-wider warion-text-gradient">WARION</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {navigation.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.05,
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                  >
                    <button
                      onClick={() => {
                        navigate(item.href);
                        onClose();
                      }}
                      className={`
                        w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium font-display tracking-wide transition-all duration-300 ease-in-out
                        ${isActive 
                          ? 'bg-warion-green text-warion-black transform scale-105' 
                          : 'text-sidebar-foreground hover:bg-warion-gray hover:text-warion-green hover:transform hover:scale-102'
                        }
                      `}
                    >
                      <item.icon className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs opacity-70">{item.description}</div>
                      </div>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* User info */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-warion-gray text-warion-green font-display font-bold">
                  W
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-display font-semibold text-sidebar-foreground truncate tracking-wide">
                  WARION ADMIN
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  admin@warion.com
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-warion-red hover:text-white font-display tracking-widest transition-all duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">LOGOUT</span>
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
