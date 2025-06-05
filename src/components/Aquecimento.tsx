
import React, { useState } from 'react';
import { Activity, Phone, Users, Plus, Trash2, Check, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface NumeroAquecimento {
  id: string;
  numero: string;
  descricao?: string;
  copiado?: boolean;
}

interface GrupoAquecimento {
  id: string;
  nome: string;
  url: string;
}

const mockNumerosAquecimento: NumeroAquecimento[] = [
  { id: '1', numero: '+551000000', descricao: '-' },
];

const mockGruposAquecimento: GrupoAquecimento[] = [];

const Aquecimento = () => {
  const [numerosAquecimento, setNumerosAquecimento] = useState<NumeroAquecimento[]>(mockNumerosAquecimento);
  const [gruposAquecimento, setGruposAquecimento] = useState<GrupoAquecimento[]>(mockGruposAquecimento);
  const [textAreaNumeros, setTextAreaNumeros] = useState('');
  const [textAreaGrupos, setTextAreaGrupos] = useState('');

  const handleSalvarNumeros = () => {
    if (!textAreaNumeros.trim()) {
      toast.error('Digite pelo menos um número para salvar');
      return;
    }

    const linhas = textAreaNumeros.split('\n').filter(linha => linha.trim());
    const novosNumeros: NumeroAquecimento[] = [];

    linhas.forEach(linha => {
      const partes = linha.split('|').map(p => p.trim());
      const numero = partes[0];
      const descricao = partes[1] || '-';

      if (numero) {
        novosNumeros.push({
          id: Date.now().toString() + Math.random(),
          numero,
          descricao
        });
      }
    });

    setNumerosAquecimento([...numerosAquecimento, ...novosNumeros]);
    setTextAreaNumeros('');
    toast.success(`${novosNumeros.length} número(s) adicionado(s) para aquecimento!`);
  };

  const handleSalvarGrupos = () => {
    if (!textAreaGrupos.trim()) {
      toast.error('Digite pelo menos um grupo para salvar');
      return;
    }

    const linhas = textAreaGrupos.split('\n').filter(linha => linha.trim());
    const novosGrupos: GrupoAquecimento[] = [];

    linhas.forEach(linha => {
      const partes = linha.split('|').map(p => p.trim());
      const nome = partes[0];
      const url = partes[1];

      if (nome && url) {
        novosGrupos.push({
          id: Date.now().toString() + Math.random(),
          nome,
          url
        });
      }
    });

    setGruposAquecimento([...gruposAquecimento, ...novosGrupos]);
    setTextAreaGrupos('');
    toast.success(`${novosGrupos.length} grupo(s) adicionado(s) para aquecimento!`);
  };

  const handleCopiarNumero = async (numero: NumeroAquecimento) => {
    try {
      await navigator.clipboard.writeText(numero.numero);
      
      // Atualizar o estado para mostrar que foi copiado
      setNumerosAquecimento(nums => 
        nums.map(n => n.id === numero.id ? { ...n, copiado: true } : n)
      );
      
      toast.success('Número copiado para a área de transferência!');
      
      // Resetar o estado após 2 segundos
      setTimeout(() => {
        setNumerosAquecimento(nums => 
          nums.map(n => n.id === numero.id ? { ...n, copiado: false } : n)
        );
      }, 2000);
    } catch (err) {
      toast.error('Erro ao copiar número');
    }
  };

  const handleRemoverNumero = (id: string) => {
    setNumerosAquecimento(numerosAquecimento.filter(n => n.id !== id));
    toast.success('Número removido!');
  };

  const handleRemoverGrupo = (id: string) => {
    setGruposAquecimento(gruposAquecimento.filter(g => g.id !== id));
    toast.success('Grupo removido!');
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Activity className="h-8 w-8 text-orange-500" />
            Aquecimento de WhatsApp
          </h2>
          <p className="text-muted-foreground">Gerencie números e grupos para aquecimento</p>
        </div>
      </div>

      <Tabs defaultValue="numeros" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="numeros" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Números de Aquecimento
          </TabsTrigger>
          <TabsTrigger value="grupos" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Links de Grupos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="numeros" className="space-y-6">
          {/* Adicionar Números */}
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Números de Aquecimento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Números (um por linha)</p>
                <Textarea
                  placeholder="+5511912345678 | Número de teste da campanha X
+5562998765432 | Aquece de novo lote VIP"
                  value={textAreaNumeros}
                  onChange={(e) => setTextAreaNumeros(e.target.value)}
                  rows={8}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Formato: +5511999999999 | Descrição (opcional)
                </p>
              </div>
              <Button 
                onClick={handleSalvarNumeros}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Salvar Números de Aquecimento
              </Button>
            </CardContent>
          </Card>

          {/* Lista de Números */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Números Cadastrados ({numerosAquecimento.length})
                <span className="text-sm font-normal text-muted-foreground">
                  {numerosAquecimento.length} números
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {numerosAquecimento.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Copiar</TableHead>
                      <TableHead>Número</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {numerosAquecimento.map((numero) => (
                      <TableRow key={numero.id}>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopiarNumero(numero)}
                            className={numero.copiado ? 'text-green-500' : 'text-primary'}
                          >
                            {numero.copiado ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Phone className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-primary" />
                            <a 
                              href={`https://wa.me/${numero.numero.replace(/[^\d]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline font-mono"
                            >
                              {numero.numero}
                            </a>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {numero.descricao}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoverNumero(numero.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum número de aquecimento cadastrado ainda
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grupos" className="space-y-6">
          {/* Adicionar Grupos */}
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Links de Grupos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Grupos (um por linha)</p>
                <Textarea
                  placeholder="Nome do Grupo | https://chat.whatsapp.com/abc123def456
Outro Grupo | https://chat.whatsapp.com/def456ghi789"
                  value={textAreaGrupos}
                  onChange={(e) => setTextAreaGrupos(e.target.value)}
                  rows={8}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Formato: Nome do Grupo | https://chat.whatsapp.com/...
                </p>
              </div>
              <Button 
                onClick={handleSalvarGrupos}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Salvar Links de Grupos
              </Button>
            </CardContent>
          </Card>

          {/* Lista de Grupos */}
          <Card>
            <CardHeader>
              <CardTitle>Grupos Cadastrados ({gruposAquecimento.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {gruposAquecimento.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome do Grupo</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gruposAquecimento.map((grupo) => (
                      <TableRow key={grupo.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span className="font-medium">{grupo.nome}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <a 
                            href={grupo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <LinkIcon className="h-4 w-4" />
                            <span className="truncate max-w-xs font-mono text-sm">{grupo.url}</span>
                          </a>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoverGrupo(grupo.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum grupo cadastrado ainda
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Aquecimento;
