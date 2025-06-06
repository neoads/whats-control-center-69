import React, { useState, useEffect } from 'react';
import { Shield, Lock, Mail, MessageSquare, Settings, Plus, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface ConfigSalva {
  id: string;
  nome: string;
  email_recuperacao: string;
  codigo_pin: string;
  mensagem_recuperacao: string;
  criado_em: string;
}

interface EmailDispositivo {
  id: string;
  email: string;
  autorizado: boolean;
  created_at: string;
}

const Seguranca = () => {
  const { user } = useAuth();
  const [emailRecuperacao, setEmailRecuperacao] = useState('');
  const [mensagemRecuperacao, setMensagemRecuperacao] = useState('');
  const [codigoPIN, setCodigoPIN] = useState('');
  const [configsSalvas, setConfigsSalvas] = useState<ConfigSalva[]>([]);
  const [emailsDispositivos, setEmailsDispositivos] = useState<EmailDispositivo[]>([]);
  const [modalSalvarConfig, setModalSalvarConfig] = useState(false);
  const [modalAddEmail, setModalAddEmail] = useState(false);
  const [nomeConfig, setNomeConfig] = useState('');
  const [novoEmailDispositivo, setNovoEmailDispositivo] = useState('');
  const [loading, setLoading] = useState(true);

  // Carregar dados do Supabase
  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Carregar configurações de segurança
      const { data: configs, error: configsError } = await supabase
        .from('configuracoes_seguranca')
        .select('*')
        .eq('user_id', user.id)
        .order('criado_em', { ascending: false });

      if (configsError) {
        console.error('Erro ao carregar configurações:', configsError);
      } else {
        setConfigsSalvas(configs || []);
      }

      // Carregar emails de dispositivos
      const { data: emails, error: emailsError } = await supabase
        .from('emails_dispositivos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (emailsError) {
        console.error('Erro ao carregar emails:', emailsError);
      } else {
        setEmailsDispositivos(emails || []);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados de segurança');
    } finally {
      setLoading(false);
    }
  };

  const handleSalvarSeguranca = () => {
    if (codigoPIN.length < 4 || codigoPIN.length > 8) {
      toast.error('Código PIN deve ter entre 4 e 8 caracteres');
      return;
    }
    
    setModalSalvarConfig(true);
  };

  const handleSalvarConfiguracao = async () => {
    if (!nomeConfig.trim()) {
      toast.error('Nome da configuração é obrigatório');
      return;
    }

    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('configuracoes_seguranca')
        .insert([{
          nome: nomeConfig,
          email_recuperacao: emailRecuperacao,
          codigo_pin: codigoPIN,
          mensagem_recuperacao: mensagemRecuperacao,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) {
        console.error('Erro ao salvar configuração:', error);
        toast.error('Erro ao salvar configuração');
        return;
      }

      toast.success(`Configuração '${nomeConfig}' salva com sucesso!`);
      setModalSalvarConfig(false);
      setNomeConfig('');
      await loadData(); // Recarregar dados
    } catch (error) {
      console.error('Erro ao salvar configuração:', error);
      toast.error('Erro ao salvar configuração');
    }
  };

  const handleCarregarConfig = (config: ConfigSalva) => {
    setEmailRecuperacao(config.email_recuperacao || '');
    setMensagemRecuperacao(config.mensagem_recuperacao || '');
    setCodigoPIN(config.codigo_pin || '');
    toast.success(`Configuração "${config.nome}" carregada!`);
  };

  const handleRemoverConfig = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('configuracoes_seguranca')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Erro ao remover configuração:', error);
        toast.error('Erro ao remover configuração');
        return;
      }

      toast.success('Configuração removida!');
      await loadData(); // Recarregar dados
    } catch (error) {
      console.error('Erro ao remover configuração:', error);
      toast.error('Erro ao remover configuração');
    }
  };

  const handleAddEmailDispositivo = async () => {
    if (!novoEmailDispositivo) {
      toast.error('Email é obrigatório');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(novoEmailDispositivo)) {
      toast.error('Email inválido');
      return;
    }

    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('emails_dispositivos')
        .insert([{
          email: novoEmailDispositivo,
          user_id: user.id,
          autorizado: true
        }])
        .select()
        .single();

      if (error) {
        console.error('Erro ao adicionar email:', error);
        toast.error('Erro ao adicionar email');
        return;
      }

      toast.success('Email de dispositivo adicionado!');
      setModalAddEmail(false);
      setNovoEmailDispositivo('');
      await loadData(); // Recarregar dados
    } catch (error) {
      console.error('Erro ao adicionar email:', error);
      toast.error('Erro ao adicionar email');
    }
  };

  const handleRemoverEmailDispositivo = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('emails_dispositivos')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Erro ao remover email:', error);
        toast.error('Erro ao remover email');
        return;
      }

      toast.success('Email removido!');
      await loadData(); // Recarregar dados
    } catch (error) {
      console.error('Erro ao remover email:', error);
      toast.error('Erro ao remover email');
    }
  };

  if (loading) {
    return (
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="text-center">
          <p className="text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Segurança
          </h2>
          <p className="text-muted-foreground">Gerencie suas informações de segurança e recuperação de conta</p>
        </div>
      </div>

      {/* Informações de Recuperação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Informações de Recuperação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="email-recuperacao" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              E-mail de Recuperação
            </Label>
            <Input
              id="email-recuperacao"
              type="email"
              value={emailRecuperacao}
              onChange={(e) => setEmailRecuperacao(e.target.value)}
              placeholder="seu@email.com"
            />
            <p className="text-sm text-muted-foreground">
              Este e-mail será usado para recuperar sua conta em caso de perda de acesso
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="mensagem-recuperacao" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Mensagem de Recuperação
            </Label>
            <Textarea
              id="mensagem-recuperacao"
              value={mensagemRecuperacao}
              onChange={(e) => setMensagemRecuperacao(e.target.value)}
              placeholder="Frase ou código para auxiliar na recuperação"
              rows={3}
            />
            <p className="text-sm text-muted-foreground">
              Frase de segurança para verificação extra durante a recuperação
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="codigo-pin" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Código PIN
            </Label>
            <Input
              id="codigo-pin"
              type="text"
              value={codigoPIN}
              onChange={(e) => setCodigoPIN(e.target.value)}
              placeholder="Digite seu PIN (4-8 caracteres)"
            />
            <p className="text-sm text-muted-foreground">
              PIN numérico ou alfanumérico para verificação adicional
            </p>
          </div>

          <Button 
            onClick={handleSalvarSeguranca} 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Salvar Configuração de Segurança
          </Button>
        </CardContent>
      </Card>

      {/* Modal para Salvar Configuração */}
      <Dialog open={modalSalvarConfig} onOpenChange={setModalSalvarConfig}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Salvar Configuração</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nome-configuracao">Nome da Configuração *</Label>
              <Input
                id="nome-configuracao"
                value={nomeConfig}
                onChange={(e) => setNomeConfig(e.target.value)}
                placeholder="Digite um nome para esta configuração"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setModalSalvarConfig(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSalvarConfiguracao}>
              Salvar e Aplicar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Configurações Salvas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações Salvas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {configsSalvas.length > 0 ? (
              configsSalvas.map((config) => (
                <div key={config.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Settings className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{config.nome}</p>
                        <Badge variant="secondary" className="text-xs">Configuração</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">E-mail: {config.email_recuperacao}</p>
                      <p className="text-xs text-muted-foreground">
                        Atualizado: {new Date(config.criado_em).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleCarregarConfig(config)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Carregar
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoverConfig(config.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhuma configuração salva ainda</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* E-mails de Dispositivos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            E-mails de Dispositivos
          </CardTitle>
          <Dialog open={modalAddEmail} onOpenChange={setModalAddEmail}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-1" />
                Adicionar E-mail
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar E-mail de Dispositivo</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email-dispositivo">E-mail</Label>
                  <Input
                    id="email-dispositivo"
                    type="email"
                    value={novoEmailDispositivo}
                    onChange={(e) => setNovoEmailDispositivo(e.target.value)}
                    placeholder="device@exemplo.com"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setModalAddEmail(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddEmailDispositivo}>
                  Adicionar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            E-mails vinculados a dispositivos autorizados para monitoramento e alertas
          </p>
          {emailsDispositivos.length > 0 ? (
            <div className="space-y-3">
              {emailsDispositivos.map((emailDevice) => (
                <div key={emailDevice.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{emailDevice.email}</p>
                      <Badge variant="secondary" className="mt-1">
                        {emailDevice.autorizado ? 'Autorizado' : 'Pendente'}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRemoverEmailDispositivo(emailDevice.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-4">
              Nenhum e-mail de dispositivo cadastrado ainda
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Seguranca;
