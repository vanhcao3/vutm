export interface DataSource {
     connection_type: number | null;
     coverage: number | null;
     created_at: number | null;
     created_by: string | null;
     datasource_add: string | null;
     datasource_port: string | null;
     id: string | null;
     position: Array<number>;
     updated_at: number | null;
     updated_by: string | null;
     is_display: boolean;
}
