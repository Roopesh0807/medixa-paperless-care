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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      doctors: {
        Row: {
          created_at: string | null
          doctor_id: string
          id: string
          specialization: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          doctor_id: string
          id?: string
          specialization?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          doctor_id?: string
          id?: string
          specialization?: string | null
          user_id?: string
        }
        Relationships: []
      }
      opd_staff: {
        Row: {
          created_at: string | null
          hospital_name: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          hospital_name: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          hospital_name?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      patient_records: {
        Row: {
          cause: string | null
          created_at: string | null
          discharged: boolean | null
          doctor_id: string | null
          id: string
          paid_status: boolean | null
          patient_id: string
          prescription: string | null
          summary: string | null
          tests_required: Json | null
          total_test_cost: number | null
          updated_at: string | null
        }
        Insert: {
          cause?: string | null
          created_at?: string | null
          discharged?: boolean | null
          doctor_id?: string | null
          id?: string
          paid_status?: boolean | null
          patient_id: string
          prescription?: string | null
          summary?: string | null
          tests_required?: Json | null
          total_test_cost?: number | null
          updated_at?: string | null
        }
        Update: {
          cause?: string | null
          created_at?: string | null
          discharged?: boolean | null
          doctor_id?: string | null
          id?: string
          paid_status?: boolean | null
          patient_id?: string
          prescription?: string | null
          summary?: string | null
          tests_required?: Json | null
          total_test_cost?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_records_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          aadhaar_number: string
          age: number
          created_at: string | null
          date_of_birth: string
          full_name: string
          government_scheme:
            | Database["public"]["Enums"]["government_scheme"]
            | null
          id: string
          phone: string
          scheme_benefit_percentage: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          aadhaar_number: string
          age: number
          created_at?: string | null
          date_of_birth: string
          full_name: string
          government_scheme?:
            | Database["public"]["Enums"]["government_scheme"]
            | null
          id?: string
          phone: string
          scheme_benefit_percentage?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          aadhaar_number?: string
          age?: number
          created_at?: string | null
          date_of_birth?: string
          full_name?: string
          government_scheme?:
            | Database["public"]["Enums"]["government_scheme"]
            | null
          id?: string
          phone?: string
          scheme_benefit_percentage?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name: string
          id: string
          phone?: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      government_scheme:
        | "none"
        | "bpl"
        | "ayushman_bharat"
        | "yashasvini"
        | "other"
      user_role: "opd_staff" | "doctor" | "patient" | "nurse" | "lab_staff"
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
      government_scheme: [
        "none",
        "bpl",
        "ayushman_bharat",
        "yashasvini",
        "other",
      ],
      user_role: ["opd_staff", "doctor", "patient", "nurse", "lab_staff"],
    },
  },
} as const
