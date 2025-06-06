
import React, { useState } from 'react';
import { Flame, Plus, Search, Edit, Trash2, Link, Copy } from 'lucide-react';
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
import { useSupabaseData } from '@/hooks/useSupabaseData';

const Aquecimento = () => {
  const { 
    numeros, 
    linksGrupos, 
    loading, 
    addNumero, 
    deleteNumero,
    addLinkGrupo,
    deleteLinkGrupo 
  } = useSupabaseData();
  
  const [busca, setBusca] = useState('');
  const [modalAddNumero, setModalAddNumero] = useState(false);
  const [modalAddGrupo, setModalAddGrupo] = useState(false);
  const [novoNumero, setNovoNumero] = useState({ numero: '', descricao: '' });
  const [novoGrupo, setNovoGrupo] = useState({ nome_grupo: '', url: '' });

  // Filtrar apenas números em aquecimento
  const numerosAquecimento = numeros.filter(numero => numero.status === 'aquecendo');
  
  const numerosFiltrados = numerosAquecimento.filter(numero =>
    numero.numero.toLowerCase().includes(busca.toLowerCase())
  );

  const gruposFiltrados = linksGrupos.filter(grupo =>
    grupo.nome_grupo.toLowerCase().includes(busca.toLowerCase()) ||
    grupo.url.toLowerCase().includes(busca.toLowerCase())
  );

  const handleAddNumero = async () => {
    if (novoNumero.numero.length < 8) {
      toast.error('O número deve ter pelo menos 8 caracteres');
      return;
    }
    
    await addNumero({
      numero: novoNumero.numero,
      status: 'aquecendo'
    });
    
    setModalAddNumero(false);
    setNovoNumero({ numero: '', descricao: '' });
  };

  const handleAddGrupo = async () => {
    if (!novoGrupo.nome_grupo || !novoGrupo.url) {
      toast.error('Nome do grupo e URL são obrigatórios');
      return;
    }
    
    await addLinkGrupo({
      nome_grupo: novoGrupo.nome_grupo,
      url: novoGrupo.url
    });
    
    setModalAddGrupo(false);
    setNovoGrupo({ nome_grupo: '', url: '' });
  };

  const handleCopyNumber = async (numero: string) => {
    try {
      await navigator.clipboard.writeText(numero);
      toast.success('Número copiado com sucesso!');
    } catch (err) {
      toast.error('Erro ao copiar número');
    }
  };

  const gerarLinkWhatsApp = (numero: string) => {
    const numeroLimpo = numero.replace(/\D/g, '');
    return `https://wa.me/${numeroLimpo}`;
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
            <Flame className="h-8 w-8 text-orange-500" />
            Aquecimento de Números
          </h2>
          <p className="text-muted-foreground">Gerencie números em processo de aquecimento e grupos salvos</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar números ou grupos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Números em Aquecimento */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              Números em Aquecimento
              <Badge variant="secondary" className="ml-2">
                {numerosFiltrados.length}
              </Badge>
            </CardTitle>
            <Dialog open={modalAddNumero} onOpenChange={setModalAddNumero}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Número para Aquecimento</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="numero">Número WhatsApp *</Label>
                    <Input
                      id="numero"
                      value={novoNumero.numero}
                      onChange={(e) => setNovoNumero({...novoNumero, numero: e.target.value})}
                      placeholder="+55 31 99999-9999"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="descricao">Observações</Label>
                    <Textarea
                      id="descricao"
                      value={novoNumero.descricao}
                      onChange={(e) => setNovoNumero({...novoNumero, descricao: e.target.value})}
                      placeholder="Observações sobre o aquecimento (opcional)"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setModalAddNumero(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddNumero}>
                    Adicionar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {numerosFiltrados.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Link WA</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {numerosFiltrados.map((numero) => (
                    <TableRow key={numero.id}>
                      <TableCell className="flex items-center gap-2">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span>{numero.numero}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyNumber(numero.numero)}
                          className="h-6 w-6 p-0 text-green-600 hover:text-green-700"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <a href={gerarLinkWhatsApp(numero.numero)} target="_blank" rel="noopener noreferrer">
                            <Link className="h-4 w-4 mr-1" />
                            Abrir
                          </a>
                        </Button>
                      </TableCell>
                      <TableCell>
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
                                Tem certeza que deseja remover o número {numero.numero} do aquecimento?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => deleteNumero(numero.id)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Remover
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhum número em aquecimento</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setModalAddNumero(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar primeiro número
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Grupos Salvos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5 text-blue-500" />
              Grupos Salvos
              <Badge variant="secondary" className="ml-2">
                {gruposFiltrados.length}
              </Badge>
            </CardTitle>
            <Dialog open={modalAddGrupo} onOpenChange={setModalAddGrupo}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Grupo</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nome-grupo">Nome do Grupo *</Label>
                    <Input
                      id="nome-grupo"
                      value={novoGrupo.nome_grupo}
                      onChange={(e) => setNovoGrupo({...novoGrupo, nome_grupo: e.target.value})}
                      placeholder="Ex: Grupo VIP"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="url-grupo">Link do Grupo *</Label>
                    <Input
                      id="url-grupo"
                      value={novoGrupo.url}
                      onChange={(e) => setNovoGrupo({...novoGrupo, url: e.target.value})}
                      placeholder="https://chat.whatsapp.com/..."
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setModalAddGrupo(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddGrupo}>
                    Adicionar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {gruposFiltrados.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gruposFiltrados.map((grupo) => (
                    <TableRow key={grupo.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Link className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">{grupo.nome_grupo}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <a href={grupo.url} target="_blank" rel="noopener noreferrer">
                              <Link className="h-4 w-4" />
                            </a>
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
                                  Tem certeza que deseja excluir o grupo "{grupo.nome_grupo}"?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => deleteLinkGrupo(grupo.id)}
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
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhum grupo salvo</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setModalAddGrupo(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar primeiro grupo
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Aquecimento;
