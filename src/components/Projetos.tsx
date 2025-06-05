
import React, { useState } from 'react';
import { FolderOpen, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface Projeto {
  id: string;
  nome: string;
  descricao: string;
}

const mockProjetos: Projeto[] = [
  { id: '1', nome: 'Projeto Alpha', descricao: 'Campanha de marketing digital para novos clientes' },
  { id: '2', nome: 'Projeto Beta', descricao: 'Suporte técnico e atendimento ao cliente via WhatsApp' },
  { id: '3', nome: 'Projeto Gamma', descricao: 'Vendas diretas e follow-up de leads qualificados' },
];

const Projetos = () => {
  const [projetos, setProjetos] = useState<Projeto[]>(mockProjetos);
  const [busca, setBusca] = useState('');
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [projetoSelecionado, setProjetoSelecionado] = useState<Projeto | null>(null);
  const [novoProjeto, setNovoProjeto] = useState({ nome: '', descricao: '' });

  const projetosFiltrados = projetos.filter(projeto =>
    projeto.nome.toLowerCase().includes(busca.toLowerCase()) ||
    projeto.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  const handleAddProjeto = () => {
    if (novoProjeto.nome.length < 2) {
      toast.error('Nome do projeto deve ter pelo menos 2 caracteres');
      return;
    }
    
    const projeto: Projeto = {
      id: Date.now().toString(),
      ...novoProjeto
    };
    setProjetos([...projetos, projeto]);
    setModalAdd(false);
    setNovoProjeto({ nome: '', descricao: '' });
    toast.success('Projeto adicionado com sucesso!');
  };

  const handleEditProjeto = () => {
    if (!projetoSelecionado) return;
    
    if (novoProjeto.nome.length < 2) {
      toast.error('Nome do projeto deve ter pelo menos 2 caracteres');
      return;
    }

    setProjetos(projetos.map(p => 
      p.id === projetoSelecionado.id 
        ? { ...p, nome: novoProjeto.nome, descricao: novoProjeto.descricao }
        : p
    ));
    setModalEdit(false);
    setProjetoSelecionado(null);
    setNovoProjeto({ nome: '', descricao: '' });
    toast.success('Projeto atualizado com sucesso!');
  };

  const handleDeleteProjeto = (id: string) => {
    setProjetos(projetos.filter(p => p.id !== id));
    toast.success('Projeto removido com sucesso!');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Projetos</h2>
          <p className="text-muted-foreground">Organize seus números WhatsApp por projetos e campanhas</p>
        </div>
        <Dialog open={modalAdd} onOpenChange={setModalAdd}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Projeto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Projeto</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nome" className="text-right">Nome</Label>
                <Input
                  id="nome"
                  value={novoProjeto.nome}
                  onChange={(e) => setNovoProjeto({...novoProjeto, nome: e.target.value})}
                  placeholder="Nome do projeto"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="descricao" className="text-right">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={novoProjeto.descricao}
                  onChange={(e) => setNovoProjeto({...novoProjeto, descricao: e.target.value})}
                  placeholder="Descrição do projeto (opcional)"
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setModalAdd(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddProjeto}>
                Adicionar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar Projetos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar projetos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-purple-500" />
            Lista de Projetos
            <Badge variant="secondary" className="ml-2">
              {projetosFiltrados.length} de {projetos.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Projeto</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projetosFiltrados.map((projeto) => (
                <TableRow key={projeto.id}>
                  <TableCell className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">{projeto.nome}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {projeto.descricao.length > 60 
                        ? `${projeto.descricao.substring(0, 60)}...` 
                        : projeto.descricao
                      }
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setProjetoSelecionado(projeto);
                          setNovoProjeto({ nome: projeto.nome, descricao: projeto.descricao });
                          setModalEdit(true);
                        }}
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
                              Tem certeza que deseja excluir o projeto "{projeto.nome}"? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteProjeto(projeto.id)}
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Edição */}
      <Dialog open={modalEdit} onOpenChange={setModalEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Projeto</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-nome" className="text-right">Nome</Label>
              <Input
                id="edit-nome"
                value={novoProjeto.nome}
                onChange={(e) => setNovoProjeto({...novoProjeto, nome: e.target.value})}
                placeholder="Nome do projeto"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-descricao" className="text-right">Descrição</Label>
              <Textarea
                id="edit-descricao"
                value={novoProjeto.descricao}
                onChange={(e) => setNovoProjeto({...novoProjeto, descricao: e.target.value})}
                placeholder="Descrição do projeto (opcional)"
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setModalEdit(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditProjeto}>
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projetos;
