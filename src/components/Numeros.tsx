
import React, { useState } from 'react';
import { Phone, Plus, Search, Filter, Eye, Edit, Trash2, CheckCircle, PhoneOff, AlertTriangle, Zap, Clock, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { useSupabaseData, NumeroData } from '@/hooks/useSupabaseData';

const statusConfig = {
  'ativo': { icon: CheckCircle, color: 'bg-green-500', textColor: 'text-green-500' },
  'inativo': { icon: PhoneOff, color: 'bg-gray-500', textColor: 'text-gray-500' },
  'suspenso': { icon: AlertTriangle, color: 'bg-red-500', textColor: 'text-red-500' },
  'api': { icon: Zap, color: 'bg-blue-500', textColor: 'text-blue-500' },
  'aquecendo': { icon: Clock, color: 'bg-yellow-500', textColor: 'text-yellow-500' }
};

const Numeros = () => {
  const { 
    numeros, 
    projetos, 
    responsaveis,
    loading, 
    addNumero, 
    updateNumero, 
    deleteNumero 
  } = useSupabaseData();
  
  const [filtroStatus, setFiltroStatus] = useState<string>('Todos');
  const [filtroProjeto, setFiltroProjeto] = useState<string>('Todos');
  const [busca, setBusca] = useState('');
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDetails, setModalDetails] = useState(false);
  const [numeroSelecionado, setNumeroSelecionado] = useState<NumeroData | null>(null);
  const [novoNumero, setNovoNumero] = useState({
    numero: '',
    projeto_id: '',
    responsavel_id: '',
    dispositivo: '' as ('Celular' | 'Emulador' | ''),
    status: 'aquecendo' as ('ativo' | 'inativo' | 'suspenso' | 'api' | 'aquecendo')
  });

  const statusList = ['Todos', 'ativo', 'inativo', 'suspenso', 'api', 'aquecendo'];

  const numerosFiltrados = numeros.filter(numero => {
    const matchStatus = filtroStatus === 'Todos' || numero.status === filtroStatus.toLowerCase();
    const matchProjeto = filtroProjeto === 'Todos' || numero.projeto_id === filtroProjeto;
    const matchBusca = numero.numero.toLowerCase().includes(busca.toLowerCase()) ||
                      (numero.dispositivo && numero.dispositivo.toLowerCase().includes(busca.toLowerCase()));
    return matchStatus && matchProjeto && matchBusca;
  });

  const handleCopyNumber = async (numero: string) => {
    try {
      await navigator.clipboard.writeText(numero);
      toast.success('Número copiado com sucesso!');
    } catch (err) {
      toast.error('Erro ao copiar número');
    }
  };

  const handleAddNumero = async () => {
    if (novoNumero.numero.length < 8) {
      toast.error('O número deve ter pelo menos 8 caracteres');
      return;
    }
    
    await addNumero({
      numero: novoNumero.numero,
      projeto_id: novoNumero.projeto_id || undefined,
      responsavel_id: novoNumero.responsavel_id || undefined,
      dispositivo: novoNumero.dispositivo || undefined,
      status: novoNumero.status
    });
    
    setModalAdd(false);
    setNovoNumero({
      numero: '',
      projeto_id: '',
      responsavel_id: '',
      dispositivo: '',
      status: 'aquecendo'
    });
  };

  const handleEditNumero = async () => {
    if (!numeroSelecionado) return;
    
    if (novoNumero.numero.length < 8) {
      toast.error('O número deve ter pelo menos 8 caracteres');
      return;
    }

    await updateNumero(numeroSelecionado.id, {
      numero: novoNumero.numero,
      projeto_id: novoNumero.projeto_id || null,
      responsavel_id: novoNumero.responsavel_id || null,
      dispositivo: novoNumero.dispositivo || null,
      status: novoNumero.status
    });
    
    setModalEdit(false);
    setNumeroSelecionado(null);
  };

  const handleDeleteNumero = async (id: string) => {
    await deleteNumero(id);
  };

  const openEditModal = (numero: NumeroData) => {
    setNumeroSelecionado(numero);
    setNovoNumero({
      numero: numero.numero,
      projeto_id: numero.projeto_id || '',
      responsavel_id: numero.responsavel_id || '',
      dispositivo: (numero.dispositivo || '') as ('Celular' | 'Emulador' | ''),
      status: numero.status
    });
    setModalEdit(true);
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
    <TooltipProvider>
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Números WhatsApp</h2>
            <p className="text-muted-foreground">Gerencie todos os números da sua operação</p>
          </div>
          <Dialog open={modalAdd} onOpenChange={setModalAdd}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Número
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Número</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="numero">Número WhatsApp *</Label>
                  <Input
                    id="numero"
                    value={novoNumero.numero}
                    onChange={(e) => setNovoNumero({...novoNumero, numero: e.target.value})}
                    placeholder="+55 31 8297-7059"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="projeto">Projeto</Label>
                  <Select 
                    value={novoNumero.projeto_id} 
                    onValueChange={(value) => setNovoNumero({...novoNumero, projeto_id: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um projeto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Sem projeto</SelectItem>
                      {projetos.map(projeto => (
                        <SelectItem key={projeto.id} value={projeto.id}>{projeto.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="responsavel">Responsável</Label>
                  <Select 
                    value={novoNumero.responsavel_id} 
                    onValueChange={(value) => setNovoNumero({...novoNumero, responsavel_id: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Sem responsável</SelectItem>
                      {responsaveis.map(resp => (
                        <SelectItem key={resp.id} value={resp.id}>{resp.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dispositivo">Dispositivo</Label>
                  <Select 
                    value={novoNumero.dispositivo} 
                    onValueChange={(value) => setNovoNumero({...novoNumero, dispositivo: value as 'Celular' | 'Emulador' | ''})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o dispositivo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Não definido</SelectItem>
                      <SelectItem value="Emulador">Emulador</SelectItem>
                      <SelectItem value="Celular">Celular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select 
                    value={novoNumero.status} 
                    onValueChange={(value) => setNovoNumero({...novoNumero, status: value as NumeroData['status']})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="aquecendo">Aquecendo</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                      <SelectItem value="suspenso">Suspenso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setModalAdd(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddNumero}>
                  Adicionar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filtros e Busca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-wrap gap-2">
                  {statusList.map((status) => (
                    <Button
                      key={status}
                      variant={filtroStatus === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFiltroStatus(status)}
                    >
                      {status === 'Todos' ? 'Todos' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>
                <div className="flex gap-2 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Buscar números..."
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-64">
                  <Label htmlFor="filtro-projeto">Filtrar por Projeto</Label>
                  <Select value={filtroProjeto} onValueChange={setFiltroProjeto}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um projeto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">Todos os projetos</SelectItem>
                      {projetos.map(projeto => (
                        <SelectItem key={projeto.id} value={projeto.id}>{projeto.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Lista de Números ({numerosFiltrados.length})
              </span>
              <span className="text-sm font-normal text-muted-foreground">
                {numerosFiltrados.length} de {numeros.length}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {numerosFiltrados.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Projeto</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Dispositivo</TableHead>
                    <TableHead>Mensagens</TableHead>
                    <TableHead>Última Atividade</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {numerosFiltrados.map((numero) => {
                    const StatusIcon = statusConfig[numero.status]?.icon || PhoneOff;
                    const projetoNome = projetos.find(p => p.id === numero.projeto_id)?.nome || 'Sem projeto';
                    const responsavelNome = responsaveis.find(r => r.id === numero.responsavel_id)?.nome || 'Não atribuído';
                    
                    return (
                      <TableRow key={numero.id}>
                        <TableCell className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{numero.numero}</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopyNumber(numero.numero)}
                                className="h-6 w-6 p-0"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copiar número</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`${statusConfig[numero.status]?.textColor || 'text-gray-500'} border-current`}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {numero.status.charAt(0).toUpperCase() + numero.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{projetoNome}</TableCell>
                        <TableCell>{responsavelNome}</TableCell>
                        <TableCell>{numero.dispositivo || 'Não definido'}</TableCell>
                        <TableCell>{numero.mensagens}</TableCell>
                        <TableCell>
                          {numero.ultima_atividade 
                            ? new Date(numero.ultima_atividade).toLocaleString('pt-BR', { 
                                day: '2-digit', 
                                month: '2-digit', 
                                year: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            : 'Nunca utilizado'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setNumeroSelecionado(numero);
                                setModalDetails(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => openEditModal(numero)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja excluir o número {numero.numero}? Esta ação não pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDeleteNumero(numero.id)}
                                    className="bg-destructive hover:bg-destructive/90"
                                  >
                                    Excluir
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhum número encontrado</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setModalAdd(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar seu primeiro número
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal de Detalhes */}
        <Dialog open={modalDetails} onOpenChange={setModalDetails}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Detalhes do Número
              </DialogTitle>
            </DialogHeader>
            {numeroSelecionado && (
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{numeroSelecionado.numero}</h3>
                  <Badge 
                    variant="outline"
                    className={`${statusConfig[numeroSelecionado.status]?.textColor || 'text-gray-500'} border-current`}
                  >
                    {numeroSelecionado.status.charAt(0).toUpperCase() + numeroSelecionado.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-muted rounded flex items-center justify-center">
                          📁
                        </div>
                        Projeto
                      </Label>
                      <p className="text-sm font-medium">
                        {projetos.find(p => p.id === numeroSelecionado.projeto_id)?.nome || 'Sem projeto'}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-muted rounded flex items-center justify-center">
                          👤
                        </div>
                        Responsável
                      </Label>
                      <p className="text-sm font-medium">
                        {responsaveis.find(r => r.id === numeroSelecionado.responsavel_id)?.nome || 'Não atribuído'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-muted rounded flex items-center justify-center">
                        📱
                      </div>
                      Dispositivo
                    </Label>
                    <p className="text-sm font-medium">
                      {numeroSelecionado.dispositivo || 'Não definido'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-muted rounded flex items-center justify-center">
                          💬
                        </div>
                        Mensagens
                      </Label>
                      <p className="text-2xl font-bold">{numeroSelecionado.mensagens}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-muted rounded flex items-center justify-center">
                          🕒
                        </div>
                        Última Atividade
                      </Label>
                      <p className="text-sm font-medium">
                        {numeroSelecionado.ultima_atividade 
                          ? new Date(numeroSelecionado.ultima_atividade).toLocaleString('pt-BR', {
                              day: '2-digit', 
                              month: '2-digit', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : 'Nunca utilizado'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-muted rounded flex items-center justify-center">
                        🗓️
                      </div>
                      Criado em
                    </Label>
                    <p className="text-sm font-medium">
                      {new Date(numeroSelecionado.criado_em).toLocaleString('pt-BR', {
                        day: '2-digit', 
                        month: '2-digit', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setModalDetails(false)}>
                Fechar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de Edição */}
        <Dialog open={modalEdit} onOpenChange={setModalEdit}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Número</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-numero">Número WhatsApp *</Label>
                <Input
                  id="edit-numero"
                  value={novoNumero.numero}
                  onChange={(e) => setNovoNumero({...novoNumero, numero: e.target.value})}
                  placeholder="+55 31 8297-7059"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-projeto">Projeto</Label>
                <Select 
                  value={novoNumero.projeto_id} 
                  onValueChange={(value) => setNovoNumero({...novoNumero, projeto_id: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Sem projeto</SelectItem>
                    {projetos.map(projeto => (
                      <SelectItem key={projeto.id} value={projeto.id}>{projeto.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-responsavel">Responsável</Label>
                <Select 
                  value={novoNumero.responsavel_id} 
                  onValueChange={(value) => setNovoNumero({...novoNumero, responsavel_id: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Sem responsável</SelectItem>
                    {responsaveis.map(resp => (
                      <SelectItem key={resp.id} value={resp.id}>{resp.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-dispositivo">Dispositivo</Label>
                <Select 
                  value={novoNumero.dispositivo} 
                  onValueChange={(value) => setNovoNumero({...novoNumero, dispositivo: value as 'Celular' | 'Emulador' | ''})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o dispositivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Não definido</SelectItem>
                    <SelectItem value="Emulador">Emulador</SelectItem>
                    <SelectItem value="Celular">Celular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status *</Label>
                <Select 
                  value={novoNumero.status} 
                  onValueChange={(value) => setNovoNumero({...novoNumero, status: value as NumeroData['status']})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="aquecendo">Aquecendo</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                    <SelectItem value="suspenso">Suspenso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setModalEdit(false)}>
                Cancelar
              </Button>
              <Button onClick={handleEditNumero} className="bg-blue-600 hover:bg-blue-700">
                Salvar Alterações
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default Numeros;
