
import React from 'react';
import { Phone, FolderOpen, Users, MessageSquare, CheckCircle, Zap, Clock, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const stats = [
    { title: 'Total de Números', value: '24', icon: Phone },
    { title: 'Projetos Ativos', value: '8', icon: FolderOpen },
    { title: 'Responsáveis', value: '12', icon: Users },
    { title: 'Grupos Salvos', value: '5', icon: MessageSquare },
  ];

  const statusData = [
    { status: 'Ativo', count: 12, icon: CheckCircle, color: 'bg-green-500' },
    { status: 'API', count: 5, icon: Zap, color: 'bg-blue-500' },
    { status: 'Aquecendo', count: 4, icon: Clock, color: 'bg-yellow-500' },
    { status: 'Inativo', count: 2, icon: XCircle, color: 'bg-gray-500' },
    { status: 'Suspenso', count: 1, icon: AlertTriangle, color: 'bg-red-500' },
  ];

  const recentNumbers = [
    { number: '+55 11 99999-9999', project: 'Campanha Verão', status: 'Ativo', statusColor: 'bg-green-500' },
    { number: '+55 11 88888-8888', project: 'Black Friday', status: 'API', statusColor: 'bg-blue-500' },
    { number: '+55 11 77777-7777', project: 'Lançamento', status: 'Aquecendo', statusColor: 'bg-yellow-500' },
    { number: '+55 11 66666-6666', project: 'Suporte', status: 'Ativo', statusColor: 'bg-green-500' },
    { number: '+55 11 55555-5555', project: 'Vendas', status: 'Inativo', statusColor: 'bg-gray-500' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h1 className="text-3xl font-bold text-foreground font-display tracking-wider warion-text-gradient">DASHBOARD</h1>
        <p className="text-muted-foreground mt-2 font-body">Visão geral do seu sistema</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {stats.map((stat, index) => (
          <Card key={index} className="warion-card group cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-display tracking-wide">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground font-display">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-primary group-hover:text-warion-green transition-colors duration-200" />
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status dos Números */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <Card className="warion-card">
            <CardHeader>
              <CardTitle className="text-foreground font-display tracking-wider">STATUS DOS NÚMEROS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {statusData.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${item.color}`}>
                      <item.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-foreground font-display tracking-wide">{item.status}</span>
                  </div>
                  <Badge variant="outline" className="bg-background font-display">
                    {item.count}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Últimos Números Adicionados */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <Card className="warion-card">
            <CardHeader>
              <CardTitle className="text-foreground font-display tracking-wider">ÚLTIMOS NÚMEROS ADICIONADOS</CardTitle>
            </CardHeader>
            <CardContent>
              {recentNumbers.length > 0 ? (
                <div className="space-y-3">
                  {recentNumbers.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all duration-200 hover:border-l-2 hover:border-l-warion-green"
                    >
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" className="p-2 hover:text-warion-green">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <div>
                          <p className="font-medium text-foreground font-body">{item.number}</p>
                          <p className="text-sm text-muted-foreground">{item.project}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${item.statusColor}`} />
                        <Badge variant="outline" className="text-xs font-display">
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum número cadastrado ainda
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
