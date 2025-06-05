
import React, { useState } from 'react';
import { Shield, Lock, Mail, MessageSquare, Settings, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
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
  dataAtualizacao: string;
}

interface EmailDispositivo {
  id: string;
  email: string;
  projeto?: string;
}

const mockConfigsSalvas: ConfigSalva[] = [
  { id: '1', nome: 'Config Principal', email: 'admin@warion.com', dataAtualizacao: '15/01/2024' },
  { id: '2', nome: 'Backup Config', email: 'backup@warion.com', dataAtualizacao: '10/01/2024' },
];

const mockEmailsDispositivos: EmailDispositivo[] = [
  { id: '1', email: 'device1@warion.com', projeto: 'Projeto Alpha' },
  { id: '2', email: 'device2@warion.com' },
];

const Seguranca = () => {
  const [emailRecuperacao, setEmailRecuperacao] = useState('admin@warion.com');
  const [mensagemRecuperacao, setMensagemRecuperacao] = useState('Chave de recuperação WARION 2024');
  const [codigoPIN, setCodigoPIN] = useState('1234');
  const [mostrarPIN, setMostrarPIN] = useState(false);
  const [configsSalvas, setConfigsSalvas] = useState<ConfigSalva[]>(mockConfigsSalvas);
  const [emailsDispositivos, setEmailsDispositivos] = useState<EmailDispositivo[]>(mockEmailsDispositivos);
  const [modalSalvarConfig, setModalSalvarConfig] = useState(false);
  const [modalAddEmail, setModalAddEmail] = useState(false);
  const [nomeConfig, setNomeConfig] = useState('');
  const [novoEmailDispositivo, setNovoEmailDispositivo] = useState({ email: '', projeto: '' });

  const handleSalvarSeguranca = () => {
    if (codigoPIN.length < 4 || codigoPIN.length > 8) {
      toast.error('Código PIN deve ter entre 4 e 8 caracteres');
      return;
    }
    toast.success('Configurações de segurança salvas!');
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
      dataAtualizacao: new Date().toLocaleDateString('pt-BR')
    };

    setConfigsSalvas([...configsSalvas, novaConfig]);
    setModalSalvarConfig(false);
    setNomeConfig('');
    toast.success('Configuração salva com sucesso!');
  };

  const handleCarregarConfig = (config: ConfigSalva) => {
    setEmailRecuperacao(config.email);
    toast.success(`Configuração "${config.nome}" carregada!`);
  };

  const handleRemoverConfig = (id: string) => {
    setConfigsSalvas(configsSalvas.filter(c => c.id !== id));
    toast.success('Configuração removida!');
  };

  const handleAddEmailDispositivo = () => {
    if (!novoEmailDispositivo.email) {
      toast.error('Email é obrigatório');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(novoEmailDispositivo.email)) {
      toast.error('Email inválido');
      return;
    }

    const novoEmail: EmailDispositivo = {
      id: Date.now().toString(),
      email: novoEmailDispositivo.email,
      projeto: novoEmailDispositivo.projeto || undefined
    };

    setEmailsDispositivos([...emailsDispositivos, novoEmail]);
    setModalAddEmail(false);
    setNovoEmailDispositivo({ email: '', projeto: '' });
    toast.success('Email de dispositivo adicionado!');
  };

  const handleRemoverEmailDispositivo = (id: string) => {
    setEmailsDispositivos(emailsDispositivos.filter(e => e.id !== id));
    toast.success('Email removido!');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
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
        <CardContent className="space-y-4">
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
            />
            <p className="text-sm text-muted-foreground">
              Uma frase ou código que apenas você conhece para validar sua identidade
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="codigo-pin" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Código PIN
            </Label>
            <div className="relative">
              <Input
                id="codigo-pin"
                type={mostrarPIN ? 'text' : 'password'}
                value={codigoPIN}
                onChange={(e) => setCodigoPIN(e.target.value)}
                placeholder="Digite seu PIN"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setMostrarPIN(!mostrarPIN)}
              >
                {mostrarPIN ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Código PIN de 4 a 8 caracteres para validação adicional
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSalvarSeguranca} className="bg-primary hover:bg-primary/90">
              Salvar Configuração de Segurança
            </Button>
            <Dialog open={modalSalvarConfig} onOpenChange={setModalSalvarConfig}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  Salvar como Preset
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Salvar Configuração</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nome-config" className="text-right">Nome</Label>
                    <Input
                      id="nome-config"
                      value={nomeConfig}
                      onChange={(e) => setNomeConfig(e.target.value)}
                      placeholder="Nome da configuração"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setModalSalvarConfig(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSalvarConfiguracao}>
                    Salvar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Configurações Salvas */}
      {configsSalvas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurações Salvas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {configsSalvas.map((config) => (
                <div key={config.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{config.nome}</p>
                    <p className="text-sm text-muted-foreground">{config.email}</p>
                    <p className="text-xs text-muted-foreground">Atualizado em {config.dataAtualizacao}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCarregarConfig(config)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Carregar
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoverConfig(config.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* E-mails de Dispositivos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            E-mails de Dispositivos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Gerencie os e-mails autorizados para receber notificações e alertas dos dispositivos
              </p>
              <Dialog open={modalAddEmail} onOpenChange={setModalAddEmail}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar E-mail
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar E-mail de Dispositivo</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email-dispositivo" className="text-right">E-mail</Label>
                      <Input
                        id="email-dispositivo"
                        type="email"
                        value={novoEmailDispositivo.email}
                        onChange={(e) => setNovoEmailDispositivo({...novoEmailDispositivo, email: e.target.value})}
                        placeholder="device@exemplo.com"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="projeto-dispositivo" className="text-right">Projeto</Label>
                      <Select onValueChange={(value) => setNovoEmailDispositivo({...novoEmailDispositivo, projeto: value})}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecione um projeto (opcional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Projeto Alpha">Projeto Alpha</SelectItem>
                          <SelectItem value="Projeto Beta">Projeto Beta</SelectItem>
                          <SelectItem value="Projeto Gamma">Projeto Gamma</SelectItem>
                        </SelectContent>
                      </Select>
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
            </div>

            {emailsDispositivos.length > 0 ? (
              <div className="space-y-3">
                {emailsDispositivos.map((emailDevice) => (
                  <div key={emailDevice.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="font-medium">{emailDevice.email}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Autorizado</Badge>
                          {emailDevice.projeto && (
                            <Badge variant="outline">{emailDevice.projeto}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoverEmailDispositivo(emailDevice.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">
                Nenhum e-mail de dispositivo cadastrado ainda
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Seguranca;
