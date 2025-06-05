
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
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.div 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        initial={false}
        animate={{ x: isOpen ? 0 : -256 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col h-full">
          {/* WARION Logo */}
          <motion.div 
            className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div 
              className="flex items-center justify-center w-12 h-12 rounded-xl overflow-hidden warion-logo-float"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <img 
                src="/lovable-uploads/4bd592f6-8c3f-4f70-8b94-7e7c1f77b43c.png" 
                alt="WARION Logo" 
                className="w-full h-full object-contain"
              />
            </motion.div>
            <span className="text-xl font-display font-bold text-sidebar-foreground tracking-wider warion-text-gradient">WARION</span>
          </motion.div>

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
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <motion.button
                      onClick={() => {
                        navigate(item.href);
                        onClose();
                      }}
                      className={`
                        w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium font-display tracking-wide transition-all duration-200 group
                        ${isActive 
                          ? 'warion-menu-item-active animate-neon-pulse' 
                          : 'text-sidebar-foreground warion-menu-item-hover'
                        }
                      `}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <item.icon className="h-5 w-5 group-hover:animate-bounce-subtle" />
                      </motion.div>
                      <div className="text-left">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs opacity-70">{item.description}</div>
                      </div>
                    </motion.button>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* User info */}
          <motion.div 
            className="border-t border-sidebar-border p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
              >
                <Avatar className="h-10 w-10 ring-2 ring-warion-green/30 shadow-neon-green">
                  <AvatarFallback className="bg-warion-gray text-warion-green font-display font-bold">
                    W
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-display font-semibold text-sidebar-foreground truncate tracking-wide">
                  WARION ADMIN
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  admin@warion.com
                </p>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 text-sidebar-foreground warion-button-danger font-display tracking-widest"
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium">LOGOUT</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
