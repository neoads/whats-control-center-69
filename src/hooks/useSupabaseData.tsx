
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

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
  criado_em: string;
}

export interface ProjetoData {
  id: string;
  nome: string;
  descricao?: string;
  user_id: string;
  criado_em: string;
}

export interface ResponsavelData {
  id: string;
  nome: string;
  email?: string;
  user_id: string;
  created_at: string;
}

export interface LinkGrupoData {
  id: string;
  nome_grupo: string;
  url: string;
  user_id: string;
  created_at: string;
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
      const { data: numerosData, error: numerosError } = await supabase
        .from('numeros')
        .select('*')
        .eq('user_id', user.id)
        .order('criado_em', { ascending: false });

      if (numerosError) {
        console.error('Erro ao carregar números:', numerosError);
        toast.error('Erro ao carregar dados dos números');
      }

      // Carregar projetos
      const { data: projetosData, error: projetosError } = await supabase
        .from('projetos')
        .select('*')
        .eq('user_id', user.id)
        .order('criado_em', { ascending: false });

      if (projetosError) {
        console.error('Erro ao carregar projetos:', projetosError);
        toast.error('Erro ao carregar dados dos projetos');
      }

      // Carregar responsáveis
      const { data: responsaveisData, error: responsaveisError } = await supabase
        .from('responsaveis')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (responsaveisError) {
        console.error('Erro ao carregar responsáveis:', responsaveisError);
        toast.error('Erro ao carregar dados dos responsáveis');
      }

      // Carregar links de grupos
      const { data: linksData, error: linksError } = await supabase
        .from('links_grupos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (linksError) {
        console.error('Erro ao carregar links de grupos:', linksError);
        toast.error('Erro ao carregar links de grupos');
      }

      // Convertendo o status para o tipo esperado
      const typedNumerosData = (numerosData || []).map(numero => ({
        ...numero,
        status: numero.status as 'ativo' | 'inativo' | 'suspenso' | 'api' | 'aquecendo'
      }));

      setNumeros(typedNumerosData);
      setProjetos(projetosData || []);
      setResponsaveis(responsaveisData || []);
      setLinksGrupos(linksData || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados');
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
  const addNumero = async (numero: Omit<NumeroData, 'id' | 'user_id' | 'criado_em' | 'mensagens'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('numeros')
        .insert([{ 
          ...numero, 
          user_id: user.id,
          mensagens: 0
        }])
        .select()
        .single();

      if (error) {
        console.error('Erro ao adicionar número:', error);
        toast.error('Erro ao adicionar número');
        return null;
      }
      
      toast.success('Número adicionado com sucesso!');
      return data as NumeroData;
    } catch (error) {
      console.error('Erro ao adicionar número:', error);
      toast.error('Erro ao adicionar número');
      return null;
    }
  };

  const updateNumero = async (id: string, updates: Partial<NumeroData>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('numeros')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar número:', error);
        toast.error('Erro ao atualizar número');
        return null;
      }
      
      toast.success('Número atualizado com sucesso!');
      return data as NumeroData;
    } catch (error) {
      console.error('Erro ao atualizar número:', error);
      toast.error('Erro ao atualizar número');
      return null;
    }
  };

  const deleteNumero = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('numeros')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Erro ao excluir número:', error);
        toast.error('Erro ao excluir número');
        return false;
      }
      
      toast.success('Número excluído com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao excluir número:', error);
      toast.error('Erro ao excluir número');
      return false;
    }
  };

  const addProjeto = async (projeto: Omit<ProjetoData, 'id' | 'user_id' | 'criado_em'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('projetos')
        .insert([{ ...projeto, user_id: user.id }])
        .select()
        .single();

      if (error) {
        console.error('Erro ao adicionar projeto:', error);
        toast.error('Erro ao adicionar projeto');
        return null;
      }
      
      toast.success('Projeto adicionado com sucesso!');
      return data as ProjetoData;
    } catch (error) {
      console.error('Erro ao adicionar projeto:', error);
      toast.error('Erro ao adicionar projeto');
      return null;
    }
  };

  const updateProjeto = async (id: string, updates: Partial<ProjetoData>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('projetos')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar projeto:', error);
        toast.error('Erro ao atualizar projeto');
        return null;
      }
      
      toast.success('Projeto atualizado com sucesso!');
      return data as ProjetoData;
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error);
      toast.error('Erro ao atualizar projeto');
      return null;
    }
  };

  const deleteProjeto = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('projetos')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Erro ao excluir projeto:', error);
        toast.error('Erro ao excluir projeto');
        return false;
      }
      
      toast.success('Projeto excluído com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
      toast.error('Erro ao excluir projeto');
      return false;
    }
  };

  const addResponsavel = async (responsavel: Omit<ResponsavelData, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('responsaveis')
        .insert([{ ...responsavel, user_id: user.id }])
        .select()
        .single();

      if (error) {
        console.error('Erro ao adicionar responsável:', error);
        toast.error('Erro ao adicionar responsável');
        return null;
      }
      
      toast.success('Responsável adicionado com sucesso!');
      return data;
    } catch (error) {
      console.error('Erro ao adicionar responsável:', error);
      toast.error('Erro ao adicionar responsável');
      return null;
    }
  };

  const updateResponsavel = async (id: string, updates: Partial<ResponsavelData>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('responsaveis')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar responsável:', error);
        toast.error('Erro ao atualizar responsável');
        return null;
      }
      
      toast.success('Responsável atualizado com sucesso!');
      return data;
    } catch (error) {
      console.error('Erro ao atualizar responsável:', error);
      toast.error('Erro ao atualizar responsável');
      return null;
    }
  };

  const deleteResponsavel = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('responsaveis')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Erro ao excluir responsável:', error);
        toast.error('Erro ao excluir responsável');
        return false;
      }
      
      toast.success('Responsável excluído com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao excluir responsável:', error);
      toast.error('Erro ao excluir responsável');
      return false;
    }
  };

  const addLinkGrupo = async (linkGrupo: Omit<LinkGrupoData, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('links_grupos')
        .insert([{ ...linkGrupo, user_id: user.id }])
        .select()
        .single();

      if (error) {
        console.error('Erro ao adicionar link de grupo:', error);
        toast.error('Erro ao adicionar link de grupo');
        return null;
      }
      
      toast.success('Link de grupo adicionado com sucesso!');
      return data;
    } catch (error) {
      console.error('Erro ao adicionar link de grupo:', error);
      toast.error('Erro ao adicionar link de grupo');
      return null;
    }
  };

  const updateLinkGrupo = async (id: string, updates: Partial<LinkGrupoData>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('links_grupos')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar link de grupo:', error);
        toast.error('Erro ao atualizar link de grupo');
        return null;
      }
      
      toast.success('Link de grupo atualizado com sucesso!');
      return data;
    } catch (error) {
      console.error('Erro ao atualizar link de grupo:', error);
      toast.error('Erro ao atualizar link de grupo');
      return null;
    }
  };

  const deleteLinkGrupo = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('links_grupos')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Erro ao excluir link de grupo:', error);
        toast.error('Erro ao excluir link de grupo');
        return false;
      }
      
      toast.success('Link de grupo excluído com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao excluir link de grupo:', error);
      toast.error('Erro ao excluir link de grupo');
      return false;
    }
  };

  return {
    numeros,
    projetos,
    responsaveis,
    linksGrupos,
    loading,
    addNumero,
    updateNumero,
    deleteNumero,
    addProjeto,
    updateProjeto,
    deleteProjeto,
    addResponsavel,
    updateResponsavel,
    deleteResponsavel,
    addLinkGrupo,
    updateLinkGrupo,
    deleteLinkGrupo,
    refetch: loadUserData,
  };
};
