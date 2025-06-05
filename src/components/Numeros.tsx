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

interface Numero {
  id: string;
  numero: string;
  status: 'Ativo' | 'Inativo' | 'Suspenso' | 'API' | 'Aquecendo';
  projeto: string;
  responsavel: string;
  dispositivo: 'Celular' | 'Emulador';
  mensagens: number;
  ultimaAtividade: string;
}

const mockNumeros: Numero[] = [
  { id: '1', numero: '+55 31 8297-7059', status: 'Ativo', projeto: 'TESTE', responsavel: 'SLS', dispositivo: 'Emulador', mensagens: 0, ultimaAtividade: 'Agora' },
  { id: '2', numero: '+55 11 9234-5678', status: 'Aquecendo', projeto: 'Projeto Alpha', responsavel: 'João Silva', dispositivo: 'Celular', mensagens: 15, ultimaAtividade: '2h atrás' },
  { id: '3', numero: '+55 21 8765-4321', status: 'API', projeto: 'Projeto Beta', responsavel: 'Maria Santos', dispositivo: 'Emulador', mensagens: 42, ultimaAtividade: '1h atrás' },
];

const projetos = ['Todos', 'TESTE', 'Projeto Alpha', 'Projeto Beta'];

const statusConfig = {
  'Ativo': { icon: CheckCircle, color: 'bg-green-500', textColor: 'text-green-500' },
  'Inativo': { icon: PhoneOff, color: 'bg-gray-500', textColor: 'text-gray-500' },
  'Suspenso': { icon: AlertTriangle, color: 'bg-red-500', textColor: 'text-red-500' },
  'API': { icon: Zap, color: 'bg-blue-500', textColor: 'text-blue-500' },
  'Aquecendo': { icon: Clock, color: 'bg-yellow-500', textColor: 'text-yellow-500' }
};

const Numeros = () => {
  const [numeros, setNumeros] = useState<Numero[]>(mockNumeros);
  const [filtroStatus, setFiltroStatus] = useState<string>('Todos');
  const [filtroProjeto, setFiltroProjeto] = useState<string>('Todos');
  const [busca, setBusca] = useState('');
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDetails, setModalDetails] = useState(false);
  const [numeroSelecionado, setNumeroSelecionado] = useState<Numero | null>(null);
  const [novoNumero, setNovoNumero] = useState({
    numero: '',
    projeto: '',
    responsavel: '',
    dispositivo: 'Celular' as 'Celular' | 'Emulador',
    status: 'Aquecendo' as Numero['status']
  });

  const numerosFiltrados = numeros.filter(numero => {
    const matchStatus = filtroStatus === 'Todos' || numero.status === filtroStatus;
    const matchProjeto = filtroProjeto === 'Todos' || numero.projeto === filtroProjeto;
    const matchBusca = numero.numero.toLowerCase().includes(busca.toLowerCase()) ||
                      numero.projeto.toLowerCase().includes(busca.toLowerCase()) ||
                      numero.responsavel.toLowerCase().includes(busca.toLowerCase());
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

  const handleAddNumero = () => {
    const numero: Numero = {
      id: Date.now().toString(),
      ...novoNumero,
      mensagens: 0,
      ultimaAtividade: 'Agora'
    };
    setNumeros([...numeros, numero]);
    setModalAdd(false);
    setNovoNumero({ numero: '', projeto: '', responsavel: '', dispositivo: 'Celular', status: 'Aquecendo' });
    toast.success('Número adicionado com sucesso!');
  };

  const handleEditNumero = () => {
    if (!numeroSelecionado) return;
    
    const numerosAtualizados = numeros.map(n => 
      n.id === numeroSelecionado.id 
        ? { ...numeroSelecionado, ...novoNumero }
        : n
    );
    
    setNumeros(numerosAtualizados);
    setModalEdit(false);
    setNumeroSelecionado(null);
    toast.success('Número atualizado com sucesso!');
  };

  const handleDeleteNumero = (id: string) => {
    setNumeros(numeros.filter(n => n.id !== id));
    toast.success('Número removido com sucesso!');
  };

  const openEditModal = (numero: Numero) => {
    setNumeroSelecionado(numero);
    setNovoNumero({
      numero: numero.numero,
      projeto: numero.projeto,
      responsavel: numero.responsavel,
      dispositivo: numero.dispositivo,
      status: numero.status
    });
    setModalEdit(true);
  };

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
                  <Label htmlFor="projeto">Projeto *</Label>
                  <Select onValueChange={(value) => setNovoNumero({...novoNumero, projeto: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um projeto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TESTE">TESTE</SelectItem>
                      <SelectItem value="Projeto Alpha">Projeto Alpha</SelectItem>
                      <SelectItem value="Projeto Beta">Projeto Beta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="responsavel">Responsável *</Label>
                  <Select onValueChange={(value) => setNovoNumero({...novoNumero, responsavel: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SLS">SLS</SelectItem>
                      <SelectItem value="João Silva">João Silva</SelectItem>
                      <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dispositivo">Dispositivo *</Label>
                  <Select onValueChange={(value) => setNovoNumero({...novoNumero, dispositivo: value as 'Celular' | 'Emulador'})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o dispositivo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Emulador">Emulador</SelectItem>
                      <SelectItem value="Celular">Celular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select onValueChange={(value) => setNovoNumero({...novoNumero, status: value as Numero['status']})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Aquecendo">Aquecendo</SelectItem>
                      <SelectItem value="API">API</SelectItem>
                      <SelectItem value="Inativo">Inativo</SelectItem>
                      <SelectItem value="Suspenso">Suspenso</SelectItem>
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
                  {['Todos', 'Ativo', 'Inativo', 'Suspenso', 'API', 'Aquecendo'].map((status) => (
                    <Button
                      key={status}
                      variant={filtroStatus === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFiltroStatus(status)}
                    >
                      {status}
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
                      {projetos.map((projeto) => (
                        <SelectItem key={projeto} value={projeto}>
                          {projeto}
                        </SelectItem>
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
                  const StatusIcon = statusConfig[numero.status].icon;
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
                          className={`${statusConfig[numero.status].textColor} border-current`}
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {numero.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{numero.projeto}</TableCell>
                      <TableCell>{numero.responsavel}</TableCell>
                      <TableCell>{numero.dispositivo}</TableCell>
                      <TableCell>{numero.mensagens}</TableCell>
                      <TableCell>{numero.ultimaAtividade}</TableCell>
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
                    className={`${statusConfig[numeroSelecionado.status].textColor} border-current`}
                  >
                    {numeroSelecionado.status}
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
                      <p className="text-sm font-medium">{numeroSelecionado.projeto}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-muted rounded flex items-center justify-center">
                          👤
                        </div>
                        Responsável
                      </Label>
                      <p className="text-sm font-medium">{numeroSelecionado.responsavel}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-muted rounded flex items-center justify-center">
                        📱
                      </div>
                      Dispositivo
                    </Label>
                    <p className="text-sm font-medium">{numeroSelecionado.dispositivo}</p>
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
                      <p className="text-sm font-medium">{numeroSelecionado.ultimaAtividade}</p>
                    </div>
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
                <Label htmlFor="edit-projeto">Projeto *</Label>
                <Select value={novoNumero.projeto} onValueChange={(value) => setNovoNumero({...novoNumero, projeto: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TESTE">TESTE</SelectItem>
                    <SelectItem value="Projeto Alpha">Projeto Alpha</SelectItem>
                    <SelectItem value="Projeto Beta">Projeto Beta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-responsavel">Responsável *</Label>
                <Select value={novoNumero.responsavel} onValueChange={(value) => setNovoNumero({...novoNumero, responsavel: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SLS">SLS</SelectItem>
                    <SelectItem value="João Silva">João Silva</SelectItem>
                    <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-dispositivo">Dispositivo *</Label>
                <Select value={novoNumero.dispositivo} onValueChange={(value) => setNovoNumero({...novoNumero, dispositivo: value as 'Celular' | 'Emulador'})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o dispositivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Emulador">Emulador</SelectItem>
                    <SelectItem value="Celular">Celular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select value={novoNumero.status} onValueChange={(value) => setNovoNumero({...novoNumero, status: value as Numero['status']})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Aquecendo">Aquecendo</SelectItem>
                    <SelectItem value="API">API</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                    <SelectItem value="Suspenso">Suspenso</SelectItem>
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
