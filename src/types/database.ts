// Supabase database types (for when auth is enabled)
export interface Database {
  public: {
    Tables: {
      patches: {
        Row: {
          id: string;
          user_id: string;
          patch_location_id: string;
          seed_id: string | null;
          planted_at: string | null;
          expected_harvest_at: string | null;
          harvested_at: string | null;
          amount_planted: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['patches']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['patches']['Insert']>;
      };
      pens: {
        Row: {
          id: string;
          user_id: string;
          pen_location_id: string;
          animal_id: string | null;
          animal_count: number;
          placed_at: string | null;
          current_stage: string;
          stage_started_at: string | null;
          expected_next_stage_at: string | null;
          last_gathered_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['pens']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['pens']['Insert']>;
      };
    };
  };
}
