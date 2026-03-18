export type Database = {
  public: {
    Tables: {
      fragments: {
        Row: {
          id: number;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: never;
          content: string;
          created_at?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
        };
      };
    };
  };
};

