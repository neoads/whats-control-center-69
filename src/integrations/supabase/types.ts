export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      configuracoes_seguranca: {
        Row: {
          codigo_pin: string | null
          criado_em: string | null
          email_recuperacao: string | null
          id: string
          mensagem: string | null
          mensagem_recuperacao: string | null
          nome: string
          nome_config: string | null
          user_id: string | null
        }
        Insert: {
          codigo_pin?: string | null
          criado_em?: string | null
          email_recuperacao?: string | null
          id?: string
          mensagem?: string | null
          mensagem_recuperacao?: string | null
          nome: string
          nome_config?: string | null
          user_id?: string | null
        }
        Update: {
          codigo_pin?: string | null
          criado_em?: string | null
          email_recuperacao?: string | null
          id?: string
          mensagem?: string | null
          mensagem_recuperacao?: string | null
          nome?: string
          nome_config?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      emails_dispositivos: {
        Row: {
          autorizado: boolean | null
          created_at: string | null
          email: string
          id: string
          user_id: string | null
        }
        Insert: {
          autorizado?: boolean | null
          created_at?: string | null
          email: string
          id?: string
          user_id?: string | null
        }
        Update: {
          autorizado?: boolean | null
          created_at?: string | null
          email?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emails_dispositivos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      grupos: {
        Row: {
          criado_em: string | null
          criado_por: string | null
          id: string
          nome: string
          url: string | null
        }
        Insert: {
          criado_em?: string | null
          criado_por?: string | null
          id?: string
          nome: string
          url?: string | null
        }
        Update: {
          criado_em?: string | null
          criado_por?: string | null
          id?: string
          nome?: string
          url?: string | null
        }
        Relationships: []
      }
      links_grupos: {
        Row: {
          created_at: string | null
          id: string
          nome_grupo: string
          url: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          nome_grupo: string
          url: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          nome_grupo?: string
          url?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "links_grupos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      logs_usuarios: {
        Row: {
          acao: string
          criado_em: string | null
          entidade: string
          entidade_id: string | null
          id: string
          payload: Json | null
          user_id: string | null
        }
        Insert: {
          acao: string
          criado_em?: string | null
          entidade: string
          entidade_id?: string | null
          id?: string
          payload?: Json | null
          user_id?: string | null
        }
        Update: {
          acao?: string
          criado_em?: string | null
          entidade?: string
          entidade_id?: string | null
          id?: string
          payload?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      numeros: {
        Row: {
          criado_em: string | null
          dispositivo: string | null
          id: string
          mensagens: number | null
          numero: string
          projeto_id: string | null
          responsavel_id: string | null
          status: string | null
          ultima_atividade: string | null
          user_id: string | null
        }
        Insert: {
          criado_em?: string | null
          dispositivo?: string | null
          id?: string
          mensagens?: number | null
          numero: string
          projeto_id?: string | null
          responsavel_id?: string | null
          status?: string | null
          ultima_atividade?: string | null
          user_id?: string | null
        }
        Update: {
          criado_em?: string | null
          dispositivo?: string | null
          id?: string
          mensagens?: number | null
          numero?: string
          projeto_id?: string | null
          responsavel_id?: string | null
          status?: string | null
          ultima_atividade?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "numeros_projeto_id_fkey"
            columns: ["projeto_id"]
            isOneToOne: false
            referencedRelation: "projetos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "numeros_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      numeros_aquecimento: {
        Row: {
          criado_em: string | null
          criado_por: string | null
          descricao: string | null
          id: string
          numero: string
          user_id: string | null
        }
        Insert: {
          criado_em?: string | null
          criado_por?: string | null
          descricao?: string | null
          id?: string
          numero: string
          user_id?: string | null
        }
        Update: {
          criado_em?: string | null
          criado_por?: string | null
          descricao?: string | null
          id?: string
          numero?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "numeros_aquecimento_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      phone_numbers: {
        Row: {
          assigned_to: string | null
          country_code: string | null
          created_at: string | null
          id: string
          last_activity: string | null
          metadata: Json | null
          phone_number: string
          project_id: string | null
          status: Database["public"]["Enums"]["phone_status"] | null
          updated_at: string | null
          warming_completed_at: string | null
          warming_started_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          country_code?: string | null
          created_at?: string | null
          id?: string
          last_activity?: string | null
          metadata?: Json | null
          phone_number: string
          project_id?: string | null
          status?: Database["public"]["Enums"]["phone_status"] | null
          updated_at?: string | null
          warming_completed_at?: string | null
          warming_started_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          country_code?: string | null
          created_at?: string | null
          id?: string
          last_activity?: string | null
          metadata?: Json | null
          phone_number?: string
          project_id?: string | null
          status?: Database["public"]["Enums"]["phone_status"] | null
          updated_at?: string | null
          warming_completed_at?: string | null
          warming_started_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "phone_numbers_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
          status: Database["public"]["Enums"]["project_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          status?: Database["public"]["Enums"]["project_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["project_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projetos: {
        Row: {
          criado_em: string | null
          criado_por: string | null
          descricao: string | null
          id: string
          nome: string
          user_id: string | null
        }
        Insert: {
          criado_em?: string | null
          criado_por?: string | null
          descricao?: string | null
          id?: string
          nome: string
          user_id?: string | null
        }
        Update: {
          criado_em?: string | null
          criado_por?: string | null
          descricao?: string | null
          id?: string
          nome?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projetos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      responsaveis: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          nome: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          nome: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          nome?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "responsaveis_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      security_settings: {
        Row: {
          description: string | null
          id: string
          setting_name: string
          setting_value: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          setting_name: string
          setting_value?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          setting_name?: string
          setting_value?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          criado_em: string | null
          email: string | null
          id: string
          nome: string | null
        }
        Insert: {
          criado_em?: string | null
          email?: string | null
          id: string
          nome?: string | null
        }
        Update: {
          criado_em?: string | null
          email?: string | null
          id?: string
          nome?: string | null
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          created_at: string | null
          email: string
          id: string
          nome: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          nome: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          nome?: string
        }
        Relationships: []
      }
      warming_activities: {
        Row: {
          activity_type: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          metadata: Json | null
          phone_number_id: string | null
          success: boolean | null
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          phone_number_id?: string | null
          success?: boolean | null
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          phone_number_id?: string | null
          success?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "warming_activities_phone_number_id_fkey"
            columns: ["phone_number_id"]
            isOneToOne: false
            referencedRelation: "phone_numbers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      log_user_login: {
        Args: { user_id: string }
        Returns: undefined
      }
      log_user_logout: {
        Args: { user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      phone_status: "active" | "inactive" | "warming" | "blocked"
      project_status: "active" | "paused" | "completed" | "cancelled"
      user_role: "admin" | "user" | "manager"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      phone_status: ["active", "inactive", "warming", "blocked"],
      project_status: ["active", "paused", "completed", "cancelled"],
      user_role: ["admin", "user", "manager"],
    },
  },
} as const
