// Interfaces para los datos originales

export interface DealsTypes {
  externalId: string;
  amount: string;
  salesperson: string;
  date: string;
  commission: string;
  source: string;
}

export interface CrmADeal {
  [key: string]: string | number | boolean | null | undefined; // Valores posibles en datos de CRM
  deal_id?: string;
  _id?: string;
  id_?: string;
  total?: number;
  amount?: number;
  sold_at?: string;
  created_on?: string;
  rep_name?: string;
}

export interface DealTableProps {
  deals: StandardizedDeal[];
}

// CRM B - Formato CSV
export interface CrmBDeal {
  opportunity_id: string;
  amount: string | number;
  seller: string;
  deal_date: string;
}

// Interfaz genérica para manejar filas CSV
export interface CsvRow {
  [key: string]: string;
}

// Estructura estandarizada según requerimientos del challenge
export interface StandardizedDeal {
  id: string;
  amount: number;
  salesperson: string;
  date: string; // ISO string
  commission: number; // 10% del monto
  source: string; // Identificador del CRM de origen
}

// Resultado de la transformación que incluye datos válidos e inválidos
export interface TransformationResult {
  valid: StandardizedDeal[];
  invalid: string[];
}

export interface RawDeal {
  [key: string]: string | number | null | undefined;
}

// Definición de patrones de mapeo para diferentes campos
export interface FieldPatterns {
  [standardField: string]: {
    keys: string[];
    transform?: (value: string | number | null | undefined) => string | number;
    default: string | number | (() => string | number);
  };
}

// Tipos de retorno específicos para cada función extractora
export type ExtractedId = string;
export type ExtractedAmount = number;
export type ExtractedSalesperson = string;
export type ExtractedDate = string;

// interfaces/deals.ts
export interface StandardizedDeal {
  id: string;
  amount: number;
  salesperson: string;
  date: string;
  commission: number;
  source: string;
}

export interface CrmADeal {
  deal_id?: string;
  _id?: string;
  id_?: string;
  total?: number;
  amount?: number;
  sold_at?: string;
  created_on?: string;
  rep_name?: string;
}
