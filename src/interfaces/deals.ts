export interface CrmADeal {
  deal_id?: string
  total?: number
  amount?: number
  rep_name?: string
  sold_at?: string
  created_on?: string
}

export interface CrmBDeal {
  opportunity_id: string
  amount: number
  seller: string
  deal_date: string
}

// Standardized deal structure
export interface StandardizedDeal {
  id: string
  amount: number
  salesperson: string
  date: string
  commission: number
  source: string
}

export interface DataUploaderProps {
  setDeals: React.Dispatch<React.SetStateAction<StandardizedDeal[]>>
}

export interface DealTableProps {
  deals: StandardizedDeal[]
}
