import type {  CrmBDeal, StandardizedDeal } from "@/interfaces/deals"
// import { autoMapDealFields } from "@/utils/autoMapDealFields";
import Papa from "papaparse"

export const COMMISSION_RATE = 0.1 



export function parseCsvData(csvString: string): Promise<CrmBDeal[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(csvString, {
      header: true,
      complete: (results) => {
        resolve(results.data as CrmBDeal[])
      },
      error: (error: any) => {
        reject(error)
      },
    })
  })
}

function validateDeal(deal: StandardizedDeal): boolean {
  return (
    typeof deal.id === 'string' &&
    deal.id.trim().length > 0 &&
    typeof deal.amount === 'number' &&
    deal.amount >= 0 &&
    typeof deal.salesperson === 'string' &&
    deal.salesperson.trim().length > 0 &&
    typeof deal.date === 'string' &&
    !isNaN(Date.parse(deal.date))
  )
}

export function processDeals(deals: StandardizedDeal[]): { valid: StandardizedDeal[]; invalid: StandardizedDeal[] } {
  const valid: StandardizedDeal[] = []
  const invalid: StandardizedDeal[] = []

  for (const deal of deals) {
    if (validateDeal(deal)) {
      valid.push(deal)
    } else {
      invalid.push(deal)
    }
  }

  return { valid, invalid }
}
