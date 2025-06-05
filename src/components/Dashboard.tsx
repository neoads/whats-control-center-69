
import React from 'react';
import { Phone, FolderOpen, Users, MessageSquare, CheckCircle, Zap, Clock, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Visão geral do seu sistema</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border bg-card hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status dos Números */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Status dos Números</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {statusData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${item.color}`}>
                    <item.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-foreground">{item.status}</span>
                </div>
                <Badge variant="outline" className="bg-background">
                  {item.count}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Últimos Números Adicionados */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Últimos Números Adicionados</CardTitle>
          </CardHeader>
          <CardContent>
            {recentNumbers.length > 0 ? (
              <div className="space-y-3">
                {recentNumbers.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="sm" className="p-2">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <div>
                        <p className="font-medium text-foreground">{item.number}</p>
                        <p className="text-sm text-muted-foreground">{item.project}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.statusColor}`} />
                      <Badge variant="outline" className="text-xs">
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
      </div>
    </div>
  );
};

export default Dashboard;
