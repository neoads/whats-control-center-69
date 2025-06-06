
import React from 'react';
import { Phone, FolderOpen, Users, MessageSquare, CheckCircle, Zap, Clock, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useSupabaseData } from '@/hooks/useSupabaseData';

const Dashboard = () => {
  const { numeros, projetos, responsaveis, linksGrupos, loading } = useSupabaseData();

  // Calcular estatísticas dos dados reais
  const stats = [
    { title: 'Total de Números', value: numeros.length.toString(), icon: Phone },
    { title: 'Projetos Ativos', value: projetos.length.toString(), icon: FolderOpen },
    { title: 'Responsáveis', value: responsaveis.length.toString(), icon: Users },
    { title: 'Grupos Salvos', value: linksGrupos.length.toString(), icon: MessageSquare },
  ];

  // Calcular distribuição por status
  const statusCounts = numeros.reduce((acc, numero) => {
    acc[numero.status] = (acc[numero.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = [
    { status: 'Ativo', count: statusCounts.ativo || 0, icon: CheckCircle, color: 'bg-green-500' },
    { status: 'API', count: statusCounts.api || 0, icon: Zap, color: 'bg-blue-500' },
    { status: 'Aquecendo', count: statusCounts.aquecendo || 0, icon: Clock, color: 'bg-yellow-500' },
    { status: 'Inativo', count: statusCounts.inativo || 0, icon: XCircle, color: 'bg-gray-500' },
    { status: 'Suspenso', count: statusCounts.suspenso || 0, icon: AlertTriangle, color: 'bg-red-500' },
  ];

  // Últimos números adicionados
  const recentNumbers = numeros.slice(0, 5).map(numero => ({
    number: numero.numero,
    project: projetos.find(p => p.id === numero.projeto_id)?.nome || 'Sem projeto',
    status: numero.status,
    statusColor: (() => {
      switch (numero.status) {
        case 'ativo': return 'bg-green-500';
        case 'api': return 'bg-blue-500';
        case 'aquecendo': return 'bg-yellow-500';
        case 'inativo': return 'bg-gray-500';
        case 'suspenso': return 'bg-red-500';
        default: return 'bg-gray-500';
      }
    })()
  }));

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <p className="text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }

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
                        <Badge variant="outline" className="text-xs font-display capitalize">
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
