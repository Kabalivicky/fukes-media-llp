export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          inquiry_type: string | null
          message: string
          name: string
          phone: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          inquiry_type?: string | null
          message: string
          name: string
          phone?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          inquiry_type?: string | null
          message?: string
          name?: string
          phone?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contracts: {
        Row: {
          client_email: string
          client_name: string
          contract_file_url: string | null
          contract_terms: string | null
          created_at: string
          currency: string | null
          deliverables: string[] | null
          end_date: string | null
          id: string
          ip_rights: string | null
          milestones: Json | null
          payment_terms: string | null
          project_description: string | null
          project_name: string
          project_type: string
          revision_rounds: number | null
          signed_at: string | null
          special_clauses: string[] | null
          start_date: string | null
          status: string | null
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          client_email: string
          client_name: string
          contract_file_url?: string | null
          contract_terms?: string | null
          created_at?: string
          currency?: string | null
          deliverables?: string[] | null
          end_date?: string | null
          id?: string
          ip_rights?: string | null
          milestones?: Json | null
          payment_terms?: string | null
          project_description?: string | null
          project_name: string
          project_type: string
          revision_rounds?: number | null
          signed_at?: string | null
          special_clauses?: string[] | null
          start_date?: string | null
          status?: string | null
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          client_email?: string
          client_name?: string
          contract_file_url?: string | null
          contract_terms?: string | null
          created_at?: string
          currency?: string | null
          deliverables?: string[] | null
          end_date?: string | null
          id?: string
          ip_rights?: string | null
          milestones?: Json | null
          payment_terms?: string | null
          project_description?: string | null
          project_name?: string
          project_type?: string
          revision_rounds?: number | null
          signed_at?: string | null
          special_clauses?: string[] | null
          start_date?: string | null
          status?: string | null
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      pricing_quotes: {
        Row: {
          client_email: string | null
          client_name: string | null
          complexity_level: string | null
          created_at: string
          currency: string | null
          estimated_cost: number
          frame_count: number | null
          id: string
          pricing_tier: string
          project_duration: number | null
          project_name: string
          project_type: string
          service_type: string
          specifications: Json | null
          status: string | null
          updated_at: string
          user_id: string | null
          valid_until: string | null
        }
        Insert: {
          client_email?: string | null
          client_name?: string | null
          complexity_level?: string | null
          created_at?: string
          currency?: string | null
          estimated_cost: number
          frame_count?: number | null
          id?: string
          pricing_tier: string
          project_duration?: number | null
          project_name: string
          project_type: string
          service_type: string
          specifications?: Json | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
          valid_until?: string | null
        }
        Update: {
          client_email?: string | null
          client_name?: string | null
          complexity_level?: string | null
          created_at?: string
          currency?: string | null
          estimated_cost?: number
          frame_count?: number | null
          id?: string
          pricing_tier?: string
          project_duration?: number | null
          project_name?: string
          project_type?: string
          service_type?: string
          specifications?: Json | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          availability: string | null
          bio: string | null
          company: string | null
          created_at: string
          display_name: string | null
          hourly_rate: number | null
          id: string
          linkedin_url: string | null
          phone: string | null
          portfolio_url: string | null
          skills: string[] | null
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          availability?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          display_name?: string | null
          hourly_rate?: number | null
          id?: string
          linkedin_url?: string | null
          phone?: string | null
          portfolio_url?: string | null
          skills?: string[] | null
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          availability?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          display_name?: string | null
          hourly_rate?: number | null
          id?: string
          linkedin_url?: string | null
          phone?: string | null
          portfolio_url?: string | null
          skills?: string[] | null
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          budget_range: string | null
          case_study_url: string | null
          category: string | null
          challenges: string[] | null
          client: string | null
          created_at: string
          description: string | null
          duration_months: number | null
          featured: boolean | null
          id: string
          image_url: string | null
          results: string[] | null
          services: string[] | null
          solutions: string[] | null
          status: string | null
          team_size: number | null
          technologies: string[] | null
          testimonial: string | null
          testimonial_author: string | null
          title: string
          updated_at: string
          video_url: string | null
          year: number | null
        }
        Insert: {
          budget_range?: string | null
          case_study_url?: string | null
          category?: string | null
          challenges?: string[] | null
          client?: string | null
          created_at?: string
          description?: string | null
          duration_months?: number | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          results?: string[] | null
          services?: string[] | null
          solutions?: string[] | null
          status?: string | null
          team_size?: number | null
          technologies?: string[] | null
          testimonial?: string | null
          testimonial_author?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
          year?: number | null
        }
        Update: {
          budget_range?: string | null
          case_study_url?: string | null
          category?: string | null
          challenges?: string[] | null
          client?: string | null
          created_at?: string
          description?: string | null
          duration_months?: number | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          results?: string[] | null
          services?: string[] | null
          solutions?: string[] | null
          status?: string | null
          team_size?: number | null
          technologies?: string[] | null
          testimonial?: string | null
          testimonial_author?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
          year?: number | null
        }
        Relationships: []
      }
      tool_usage: {
        Row: {
          created_at: string
          error_message: string | null
          file_size: number | null
          id: string
          input_format: string | null
          output_format: string | null
          processing_time: number | null
          success: boolean | null
          tool_name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          file_size?: number | null
          id?: string
          input_format?: string | null
          output_format?: string | null
          processing_time?: number | null
          success?: boolean | null
          tool_name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          error_message?: string | null
          file_size?: number | null
          id?: string
          input_format?: string | null
          output_format?: string | null
          processing_time?: number | null
          success?: boolean | null
          tool_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
