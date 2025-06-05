
import React, { useState } from 'react';
import { Phone, Plus, Search, Filter, Eye, Edit, Trash2, MoreHorizontal, PhoneOff, AlertTriangle, CheckCircle, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
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
  { id: '1', numero: '+5511999887766', status: 'Ativo', projeto: 'Projeto Alpha', responsavel: 'João Silva', dispositivo: 'Celular', mensagens: 1523, ultimaAtividade: '2h atrás' },
  { id: '2', numero: '+5511888776655', status: 'Aquecendo', projeto: 'Projeto Beta', responsavel: 'Maria Santos', dispositivo: 'Emulador', mensagens: 45, ultimaAtividade: '30min atrás' },
  { id: '3', numero: '+5511777665544', status: 'Suspenso', projeto: 'Projeto Gamma', responsavel: 'Pedro Costa', dispositivo: 'Celular', mensagens: 892, ultimaAtividade: '1 dia atrás' },
];

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
    const matchBusca = numero.numero.toLowerCase().includes(busca.toLowerCase()) ||
                      numero.projeto.toLowerCase().includes(busca.toLowerCase()) ||
                      numero.responsavel.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchBusca;
  });

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

  const handleDeleteNumero = (id: string) => {
    setNumeros(numeros.filter(n => n.id !== id));
    toast.success('Número removido com sucesso!');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="numero" className="text-right">Número</Label>
                <Input
                  id="numero"
                  value={novoNumero.numero}
                  onChange={(e) => setNovoNumero({...novoNumero, numero: e.target.value})}
                  placeholder="+5511999887766"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="projeto" className="text-right">Projeto</Label>
                <Select onValueChange={(value) => setNovoNumero({...novoNumero, projeto: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Projeto Alpha">Projeto Alpha</SelectItem>
                    <SelectItem value="Projeto Beta">Projeto Beta</SelectItem>
                    <SelectItem value="Projeto Gamma">Projeto Gamma</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="responsavel" className="text-right">Responsável</Label>
                <Select onValueChange={(value) => setNovoNumero({...novoNumero, responsavel: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="João Silva">João Silva</SelectItem>
                    <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                    <SelectItem value="Pedro Costa">Pedro Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dispositivo" className="text-right">Dispositivo</Label>
                <Select onValueChange={(value) => setNovoNumero({...novoNumero, dispositivo: value as 'Celular' | 'Emulador'})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o dispositivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Celular">Celular</SelectItem>
                    <SelectItem value="Emulador">Emulador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select onValueChange={(value) => setNovoNumero({...novoNumero, status: value as Numero['status']})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aquecendo">Aquecendo</SelectItem>
                    <SelectItem value="Ativo">Ativo</SelectItem>
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
                  placeholder="Buscar números, projetos..."
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Lista de Números
            <Badge variant="secondary" className="ml-2">
              {numerosFiltrados.length} de {numeros.length}
            </Badge>
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
                      {numero.numero}
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
                        <Button variant="ghost" size="sm">
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
            <DialogTitle>Detalhes do Número</DialogTitle>
          </DialogHeader>
          {numeroSelecionado && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Número</Label>
                  <p className="text-sm text-muted-foreground">{numeroSelecionado.numero}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={statusConfig[numeroSelecionado.status].textColor}>
                    {numeroSelecionado.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Projeto</Label>
                  <p className="text-sm text-muted-foreground">{numeroSelecionado.projeto}</p>
                </div>
                <div>
                  <Label>Responsável</Label>
                  <p className="text-sm text-muted-foreground">{numeroSelecionado.responsavel}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Dispositivo</Label>
                  <p className="text-sm text-muted-foreground">{numeroSelecionado.dispositivo}</p>
                </div>
                <div>
                  <Label>Mensagens</Label>
                  <p className="text-sm text-muted-foreground">{numeroSelecionado.mensagens}</p>
                </div>
              </div>
              <div>
                <Label>Última Atividade</Label>
                <p className="text-sm text-muted-foreground">{numeroSelecionado.ultimaAtividade}</p>
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
    </div>
  );
};

export default Numeros;
