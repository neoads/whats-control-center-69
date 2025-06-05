
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
    <div className="h-full bg-[#0D0D0D] border-r border-gray-800 flex flex-col w-64">
      {/* WARION Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden">
          <img 
            src="/lovable-uploads/ce0047c6-a677-4884-947a-3a6b13a5aa8f.png" 
            alt="WARION Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-lg font-bold text-white tracking-wider">
          WARION
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
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
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200
                    ${isActive 
                      ? 'bg-green-500 text-black font-medium' 
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <div className="text-left flex-1">
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
      <div className="border-t border-gray-800 p-4 mt-auto">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-green-500 text-black font-bold text-sm">
              W
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">
              WARION ADMIN
            </p>
            <p className="text-xs text-gray-400">
              admin@warion.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
