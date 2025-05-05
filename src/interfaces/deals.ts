// Interfaces para los datos originales


export interface DealsTypes {
  externalId: string;
  amount: string;
  salesperson: string;
  date: string;
  commission: string;
  source: string
}

export interface CrmADeal {
  deal_id: string;
  total: number;
  amount: number;
  rep_name: string;
  sold_at: string;
  created_on: string;
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



