
import React, { useState } from 'react';
import { Shield, Lock, Mail, MessageSquare, Settings, Plus, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface ConfigSalva {
  id: string;
  nome: string;
  email: string;
  pin: string;
  mensagem: string;
  dataAtualizacao: string;
}

interface EmailDispositivo {
  id: string;
  email: string;
}

const mockConfigsSalvas: ConfigSalva[] = [
  { id: '1', nome: 'TESTE V1', email: 'emanuelytgamsdasaing@gmail.com', pin: '1234', mensagem: 'Frase de segurança V1', dataAtualizacao: '05/06/2025' },
  { id: '2', nome: 'TESTE', email: 'emanuelytgaming@gmail.com', pin: '5678', mensagem: 'Frase de segurança TESTE', dataAtualizacao: '05/06/2025' },
  { id: '3', nome: 'Configuração Padrão', email: 'emanuelytgaming@gmail.com', pin: '9012', mensagem: 'Configuração padrão', dataAtualizacao: '05/06/2025' },
];

const mockEmailsDispositivos: EmailDispositivo[] = [
  { id: '1', email: 'emanuelytgaming@gmail.com' },
];

const Seguranca = () => {
  const [emailRecuperacao, setEmailRecuperacao] = useState('admin@warion.com');
  const [mensagemRecuperacao, setMensagemRecuperacao] = useState('Frase de segurança para verificação extra durante a recuperação');
  const [codigoPIN, setCodigoPIN] = useState('1234');
  const [configsSalvas, setConfigsSalvas] = useState<ConfigSalva[]>(mockConfigsSalvas);
  const [emailsDispositivos, setEmailsDispositivos] = useState<EmailDispositivo[]>(mockEmailsDispositivos);
  const [modalSalvarConfig, setModalSalvarConfig] = useState(false);
  const [modalAddEmail, setModalAddEmail] = useState(false);
  const [nomeConfig, setNomeConfig] = useState('');
  const [novoEmailDispositivo, setNovoEmailDispositivo] = useState('');

  const handleSalvarSeguranca = () => {
    if (codigoPIN.length < 4 || codigoPIN.length > 8) {
      toast.error('Código PIN deve ter entre 4 e 8 caracteres');
      return;
    }
    toast.success('Configuração de segurança salva!');
  };

  const handleSalvarConfiguracao = () => {
    if (!nomeConfig.trim()) {
      toast.error('Nome da configuração é obrigatório');
      return;
    }

    const novaConfig: ConfigSalva = {
      id: Date.now().toString(),
      nome: nomeConfig,
      email: emailRecuperacao,
      pin: codigoPIN,
      mensagem: mensagemRecuperacao,
      dataAtualizacao: new Date().toLocaleDateString('pt-BR')
    };

    setConfigsSalvas([...configsSalvas, novaConfig]);
    setModalSalvarConfig(false);
    setNomeConfig('');
    toast.success('Configuração salva com sucesso!');
  };

  const handleCarregarConfig = (config: ConfigSalva) => {
    setEmailRecuperacao(config.email);
    setMensagemRecuperacao(config.mensagem);
    setCodigoPIN(config.pin);
    toast.success(`Configuração "${config.nome}" carregada!`);
  };

  const handleRemoverConfig = (id: string) => {
    setConfigsSalvas(configsSalvas.filter(c => c.id !== id));
    toast.success('Configuração removida!');
  };

  const handleAddEmailDispositivo = () => {
    if (!novoEmailDispositivo) {
      toast.error('Email é obrigatório');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(novoEmailDispositivo)) {
      toast.error('Email inválido');
      return;
    }

    const novoEmail: EmailDispositivo = {
      id: Date.now().toString(),
      email: novoEmailDispositivo
    };

    setEmailsDispositivos([...emailsDispositivos, novoEmail]);
    setModalAddEmail(false);
    setNovoEmailDispositivo('');
    toast.success('Email de dispositivo adicionado!');
  };

  const handleRemoverEmailDispositivo = (id: string) => {
    setEmailsDispositivos(emailsDispositivos.filter(e => e.id !== id));
    toast.success('Email removido!');
  };

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
            {configsSalvas.map((config) => (
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
                    <p className="text-sm text-muted-foreground">E-mail: {config.email}</p>
                    <p className="text-xs text-muted-foreground">Atualizado: {config.dataAtualizacao}</p>
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
            ))}
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
                      <Badge variant="secondary" className="mt-1">Autorizado</Badge>
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
