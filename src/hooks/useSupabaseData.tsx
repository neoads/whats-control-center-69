
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface NumeroData {
  id: string;
  numero: string;
  status: 'ativo' | 'inativo' | 'suspenso' | 'api' | 'aquecendo';
  projeto_id?: string;
  responsavel_id?: string;
  dispositivo?: string;
  mensagens: number;
  ultima_atividade?: string;
  user_id: string;
  criado_em: string; // Mudado de created_at para criado_em
}

export interface ProjetoData {
  id: string;
  nome: string;
  descricao?: string;
  user_id: string;
  criado_em: string; // Mudado de created_at para criado_em
}

export interface ResponsavelData {
  id: string;
  nome: string;
  email?: string;
  user_id: string;
  created_at: string; // Esta tabela usa created_at
}

export interface LinkGrupoData {
  id: string;
  nome_grupo: string;
  url: string;
  user_id: string;
  created_at: string; // Esta tabela usa created_at
}

export const useSupabaseData = () => {
  const { user } = useAuth();
  const [numeros, setNumeros] = useState<NumeroData[]>([]);
  const [projetos, setProjetos] = useState<ProjetoData[]>([]);
  const [responsaveis, setResponsaveis] = useState<ResponsavelData[]>([]);
  const [linksGrupos, setLinksGrupos] = useState<LinkGrupoData[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar dados do usuário
  const loadUserData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Carregar números
      const { data: numerosData } = await supabase
        .from('numeros')
        .select('*')
        .eq('user_id', user.id)
        .order('criado_em', { ascending: false });

      // Carregar projetos
      const { data: projetosData } = await supabase
        .from('projetos')
        .select('*')
        .eq('user_id', user.id)
        .order('criado_em', { ascending: false });

      // Carregar responsáveis
      const { data: responsaveisData } = await supabase
        .from('responsaveis')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // Carregar links de grupos
      const { data: linksData } = await supabase
        .from('links_grupos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setNumeros(numerosData || []);
      setProjetos(projetosData || []);
      setResponsaveis(responsaveisData || []);
      setLinksGrupos(linksData || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadUserData();
    } else {
      setNumeros([]);
      setProjetos([]);
      setResponsaveis([]);
      setLinksGrupos([]);
      setLoading(false);
    }
  }, [user]);

  // Configurar realtime subscriptions
  useEffect(() => {
    if (!user) return;

    const channels = [
      supabase
        .channel('numeros_changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'numeros', filter: `user_id=eq.${user.id}` },
          () => loadUserData()
        )
        .subscribe(),

      supabase
        .channel('projetos_changes')
        .on('postgres_changes',
          { event: '*', schema: 'public', table: 'projetos', filter: `user_id=eq.${user.id}` },
          () => loadUserData()
        )
        .subscribe(),

      supabase
        .channel('responsaveis_changes')
        .on('postgres_changes',
          { event: '*', schema: 'public', table: 'responsaveis', filter: `user_id=eq.${user.id}` },
          () => loadUserData()
        )
        .subscribe(),

      supabase
        .channel('links_grupos_changes')
        .on('postgres_changes',
          { event: '*', schema: 'public', table: 'links_grupos', filter: `user_id=eq.${user.id}` },
          () => loadUserData()
        )
        .subscribe(),
    ];

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  }, [user]);

  // Funções para manipular dados
  const addNumero = async (numero: Omit<NumeroData, 'id' | 'user_id' | 'criado_em'>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('numeros')
      .insert([{ ...numero, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Erro ao adicionar número:', error);
      return null;
    }
    return data;
  };

  const addProjeto = async (projeto: Omit<ProjetoData, 'id' | 'user_id' | 'criado_em'>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('projetos')
      .insert([{ ...projeto, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Erro ao adicionar projeto:', error);
      return null;
    }
    return data;
  };

  const addResponsavel = async (responsavel: Omit<ResponsavelData, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('responsaveis')
      .insert([{ ...responsavel, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Erro ao adicionar responsável:', error);
      return null;
    }
    return data;
  };

  const deleteResponsavel = async (id: string) => {
    const { error } = await supabase
      .from('responsaveis')
      .delete()
      .eq('id', id)
      .eq('user_id', user?.id);

    if (error) {
      console.error('Erro ao excluir responsável:', error);
      return false;
    }
    return true;
  };

  const updateResponsavel = async (id: string, updates: Partial<ResponsavelData>) => {
    const { data, error } = await supabase
      .from('responsaveis')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user?.id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar responsável:', error);
      return null;
    }
    return data;
  };

  return {
    numeros,
    projetos,
    responsaveis,
    linksGrupos,
    loading,
    addNumero,
    addProjeto,
    addResponsavel,
    deleteResponsavel,
    updateResponsavel,
    refetch: loadUserData,
  };
};
