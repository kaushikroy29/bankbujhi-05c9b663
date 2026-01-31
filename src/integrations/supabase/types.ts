export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    graphql_public: {
        Tables: {
            [_ in never]: never
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            graphql: {
                Args: {
                    extensions?: Json
                    operationName?: string
                    query?: string
                    variables?: Json
                }
                Returns: Json
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
    public: {
        Tables: {
            banks: {
                Row: {
                    created_at: string | null
                    description: string | null
                    established_year: number | null
                    headquarters: string | null
                    id: string
                    is_active: boolean | null
                    logo_url: string | null
                    name: string
                    name_bn: string | null
                    swift_code: string | null
                    type: string | null
                    website_url: string | null
                }
                Insert: {
                    created_at?: string | null
                    description?: string | null
                    established_year?: number | null
                    headquarters?: string | null
                    id?: string
                    is_active?: boolean | null
                    logo_url?: string | null
                    name: string
                    name_bn?: string | null
                    swift_code?: string | null
                    type?: string | null
                    website_url?: string | null
                }
                Update: {
                    created_at?: string | null
                    description?: string | null
                    established_year?: number | null
                    headquarters?: string | null
                    id?: string
                    is_active?: boolean | null
                    logo_url?: string | null
                    name?: string
                    name_bn?: string | null
                    swift_code?: string | null
                    type?: string | null
                    website_url?: string | null
                }
                Relationships: []
            }
            credit_cards: {
                Row: {
                    annual_fee: string | null
                    annual_fee_note: string | null
                    annual_fee_waived: boolean | null
                    apply_url: string | null
                    badge: string | null
                    bank_id: string | null
                    benefits: Json | null
                    category: string | null
                    created_at: string | null
                    credit_score: string | null
                    employment_types: string[] | null
                    fees: Json | null
                    fees_detailed: Json | null
                    id: string
                    image_url: string | null
                    interest_rate: string | null
                    is_active: boolean | null
                    last_fee_update: string | null
                    last_verified_date: string | null
                    max_age: number | null
                    min_age: number | null
                    min_income: string | null
                    name: string
                    required_documents: string[] | null
                }
                Insert: {
                    annual_fee?: string | null
                    annual_fee_note?: string | null
                    annual_fee_waived?: boolean | null
                    apply_url?: string | null
                    badge?: string | null
                    bank_id?: string | null
                    benefits?: Json | null
                    category?: string | null
                    created_at?: string | null
                    credit_score?: string | null
                    employment_types?: string[] | null
                    fees?: Json | null
                    fees_detailed?: Json | null
                    id?: string
                    image_url?: string | null
                    interest_rate?: string | null
                    is_active?: boolean | null
                    last_fee_update?: string | null
                    last_verified_date?: string | null
                    max_age?: number | null
                    min_age?: number | null
                    min_income?: string | null
                    name: string
                    required_documents?: string[] | null
                }
                Update: {
                    annual_fee?: string | null
                    annual_fee_note?: string | null
                    annual_fee_waived?: boolean | null
                    apply_url?: string | null
                    badge?: string | null
                    bank_id?: string | null
                    benefits?: Json | null
                    category?: string | null
                    created_at?: string | null
                    credit_score?: string | null
                    employment_types?: string[] | null
                    fees?: Json | null
                    fees_detailed?: Json | null
                    id?: string
                    image_url?: string | null
                    interest_rate?: string | null
                    is_active?: boolean | null
                    last_fee_update?: string | null
                    last_verified_date?: string | null
                    max_age?: number | null
                    min_age?: number | null
                    min_income?: string | null
                    name?: string
                    required_documents?: string[] | null
                }
                Relationships: [
                    {
                        foreignKeyName: "credit_cards_bank_id_fkey"
                        columns: ["bank_id"]
                        isOneToOne: false
                        referencedRelation: "banks"
                        referencedColumns: ["id"]
                    },
                ]
            }
            loan_products: {
                Row: {
                    apply_url: string | null
                    badge: string | null
                    bank_id: string | null
                    created_at: string | null
                    features: string[] | null
                    id: string
                    interest_rate_max: number | null
                    interest_rate_min: number | null
                    is_active: boolean | null
                    loan_type: string | null
                    max_amount: string | null
                    max_tenure_months: number | null
                    min_income: string | null
                    name: string
                    processing_fee: string | null
                }
                Insert: {
                    apply_url?: string | null
                    badge?: string | null
                    bank_id?: string | null
                    created_at?: string | null
                    features?: string[] | null
                    id?: string
                    interest_rate_max?: number | null
                    interest_rate_min?: number | null
                    is_active?: boolean | null
                    loan_type?: string | null
                    max_amount?: string | null
                    max_tenure_months?: number | null
                    min_income?: string | null
                    name: string
                    processing_fee?: string | null
                }
                Update: {
                    apply_url?: string | null
                    badge?: string | null
                    bank_id?: string | null
                    created_at?: string | null
                    features?: string[] | null
                    id?: string
                    interest_rate_max?: number | null
                    interest_rate_min?: number | null
                    is_active?: boolean | null
                    loan_type?: string | null
                    max_amount?: string | null
                    max_tenure_months?: number | null
                    min_income?: string | null
                    name?: string
                    processing_fee?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "loan_products_bank_id_fkey"
                        columns: ["bank_id"]
                        isOneToOne: false
                        referencedRelation: "banks"
                        referencedColumns: ["id"]
                    }
                ]
            }
            notifications: {
                Row: {
                    created_at: string | null
                    expires_at: string | null
                    id: string
                    message_bn: string
                    product_id: string | null
                    severity: string
                    title_bn: string
                    type: string
                }
                Insert: {
                    created_at?: string | null
                    expires_at?: string | null
                    id?: string
                    message_bn: string
                    product_id?: string | null
                    severity?: string
                    title_bn: string
                    type: string
                }
                Update: {
                    created_at?: string | null
                    expires_at?: string | null
                    id?: string
                    message_bn?: string
                    product_id?: string | null
                    severity?: string
                    title_bn?: string
                    type?: string
                }
                Relationships: []
            }
            pending_updates: {
                Row: {
                    bank_name: string
                    created_at: string | null
                    field_name: string
                    id: string
                    new_value: string
                    old_value: string | null
                    product_id: string | null
                    product_name: string
                    product_type: string
                    reviewed_by: string | null
                    source_url: string | null
                    status: string
                    submitted_by: string | null
                    updated_at: string | null
                }
                Insert: {
                    bank_name: string
                    created_at?: string | null
                    field_name: string
                    id?: string
                    new_value: string
                    old_value?: string | null
                    product_id?: string | null
                    product_name: string
                    product_type: string
                    reviewed_by?: string | null
                    source_url?: string | null
                    status?: string
                    submitted_by?: string | null
                    updated_at?: string | null
                }
                Update: {
                    bank_name?: string
                    created_at?: string | null
                    field_name?: string
                    id?: string
                    new_value?: string
                    old_value?: string | null
                    product_id?: string | null
                    product_name?: string
                    product_type?: string
                    reviewed_by?: string | null
                    source_url?: string | null
                    status?: string
                    submitted_by?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            product_change_log: {
                Row: {
                    change_description: string | null
                    change_type: string
                    created_at: string
                    created_by: string | null
                    effective_date: string
                    field_changed: string
                    id: string
                    new_value: string
                    old_value: string | null
                    product_id: string
                    product_type: string
                    source_url: string | null
                    verified: boolean | null
                }
                Insert: {
                    change_description?: string | null
                    change_type: string
                    created_at?: string
                    created_by?: string | null
                    effective_date?: string
                    field_changed: string
                    id?: string
                    new_value: string
                    old_value?: string | null
                    product_id: string
                    product_type: string
                    source_url?: string | null
                    verified?: boolean | null
                }
                Update: {
                    change_description?: string | null
                    change_type?: string
                    created_at?: string
                    created_by?: string | null
                    effective_date?: string
                    field_changed?: string
                    id?: string
                    new_value?: string
                    old_value?: string | null
                    product_id?: string
                    product_type?: string
                    source_url?: string | null
                    verified?: boolean | null
                }
                Relationships: []
            }
            savings_rates: {
                Row: {
                    bank_id: string | null
                    created_at: string | null
                    id: string
                    interest_rate: number | null
                    is_active: boolean | null
                    min_deposit: string | null
                    product_type: string | null
                    special_offer: string | null
                    tenure_label: string | null
                    tenure_months: number | null
                }
                Insert: {
                    bank_id?: string | null
                    created_at?: string | null
                    id?: string
                    interest_rate?: number | null
                    is_active?: boolean | null
                    min_deposit?: string | null
                    product_type?: string | null
                    special_offer?: string | null
                    tenure_label?: string | null
                    tenure_months?: number | null
                }
                Update: {
                    bank_id?: string | null
                    created_at?: string | null
                    id?: string
                    interest_rate?: number | null
                    is_active?: boolean | null
                    min_deposit?: string | null
                    product_type?: string | null
                    special_offer?: string | null
                    tenure_label?: string | null
                    tenure_months?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: "savings_rates_bank_id_fkey"
                        columns: ["bank_id"]
                        isOneToOne: false
                        referencedRelation: "banks"
                        referencedColumns: ["id"]
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
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
    graphql_public: {
        Enums: {},
    },
    public: {
        Enums: {},
    },
} as const

