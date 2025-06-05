
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, Phone, FolderOpen, Users, Shield, Activity, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

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
    <div className="h-full bg-gray-900 border-r border-gray-700 flex flex-col">
      {/* WARION Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-700">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl overflow-hidden">
          <img 
            src="/lovable-uploads/ce0047c6-a677-4884-947a-3a6b13a5aa8f.png" 
            alt="WARION Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-xl font-display font-bold text-white tracking-wider">
          <span className="text-green-400">WARION</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <button
                  onClick={() => {
                    navigate(item.href);
                    onClose();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-green-500 text-black' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-green-400'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs opacity-70">{item.description}</div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User info */}
      <div className="border-t border-gray-700 p-4">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gray-800 text-green-400 font-bold">
              W
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              WARION ADMIN
            </p>
            <p className="text-xs text-gray-400 truncate">
              admin@warion.com
            </p>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200"
        >
          <LogOut className="h-4 w-4" />
          <span className="font-medium">LOGOUT</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
