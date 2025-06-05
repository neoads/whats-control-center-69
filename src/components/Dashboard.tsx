
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
    { status: 'Ativo', count: 12, icon: CheckCircle, color: 'bg-green-500', glowColor: 'shadow-neon-green' },
    { status: 'API', count: 5, icon: Zap, color: 'bg-blue-500', glowColor: 'shadow-neon-blue' },
    { status: 'Aquecendo', count: 4, icon: Clock, color: 'bg-yellow-500', glowColor: 'shadow-yellow-400' },
    { status: 'Inativo', count: 2, icon: XCircle, color: 'bg-gray-500', glowColor: 'shadow-gray-400' },
    { status: 'Suspenso', count: 1, icon: AlertTriangle, color: 'bg-red-500', glowColor: 'shadow-neon-red' },
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-foreground font-display tracking-wider warion-text-gradient">DASHBOARD</h1>
        <p className="text-muted-foreground mt-2 font-body">Visão geral do seu sistema</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <Card className="warion-card group cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground font-display tracking-wide">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground font-display">{stat.value}</p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <stat.icon className="h-8 w-8 text-primary group-hover:text-warion-green transition-colors duration-200" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status dos Números */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="warion-card">
            <CardHeader>
              <CardTitle className="text-foreground font-display tracking-wider">STATUS DOS NÚMEROS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {statusData.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-all duration-200 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className={`p-2 rounded-full ${item.color} group-hover:${item.glowColor}`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <item.icon className="h-4 w-4 text-white" />
                    </motion.div>
                    <span className="font-medium text-foreground font-display tracking-wide">{item.status}</span>
                  </div>
                  <Badge variant="outline" className="bg-background font-display">
                    {item.count}
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Últimos Números Adicionados */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="warion-card">
            <CardHeader>
              <CardTitle className="text-foreground font-display tracking-wider">ÚLTIMOS NÚMEROS ADICIONADOS</CardTitle>
            </CardHeader>
            <CardContent>
              {recentNumbers.length > 0 ? (
                <div className="space-y-3">
                  {recentNumbers.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 group hover:border-l-2 hover:border-l-warion-green"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                        >
                          <Button variant="ghost" size="sm" className="p-2 group-hover:text-warion-green">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </motion.div>
                        <div>
                          <p className="font-medium text-foreground font-body">{item.number}</p>
                          <p className="text-sm text-muted-foreground">{item.project}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className={`w-2 h-2 rounded-full ${item.statusColor}`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        />
                        <Badge variant="outline" className="text-xs font-display">
                          {item.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.p 
                  className="text-center text-muted-foreground py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Nenhum número cadastrado ainda
                </motion.p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
