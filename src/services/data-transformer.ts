import type { CrmADeal, CrmBDeal, StandardizedDeal } from "@/interfaces/deals"
import Papa from "papaparse"

const COMMISSION_RATE = 0.1 // 10%

export function transformCrmAData(data: CrmADeal[]): StandardizedDeal[] {
  return data.map((deal) => {
    const amount = deal.total || deal.amount || 0
    const date = deal.sold_at || deal.created_on || new Date().toISOString()

    return {
      id: deal.deal_id,
      amount,
      salesperson: deal.rep_name,
      date: new Date(date).toISOString(),
      commission: amount * COMMISSION_RATE,
      source: "CRM A",
    }
  })
}

export function transformCrmBData(data: CrmBDeal[]): StandardizedDeal[] {
  return data.map((deal) => {
    const amount = Number(deal.amount)

    let dateObj
    try {
      dateObj = new Date(deal.deal_date.replace(/\//g, "-"))
    } catch (e) {
      dateObj = new Date()
    }

    return {
      id: deal.opportunity_id,
      amount,
      salesperson: deal.seller,
      date: dateObj.toISOString(),
      commission: amount * COMMISSION_RATE,
      source: "CRM B",
    }
  })
}

export function parseCsvData(csvString: string): Promise<CrmBDeal[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(csvString, {
      header: true,
      complete: (results) => {
        resolve(results.data as CrmBDeal[])
      },
      error: (error:any) => {
        reject(error)
      },
    })
  })
}

export function validateDeal(deal: StandardizedDeal): boolean {
  return !!deal.id && !isNaN(deal.amount) && deal.amount > 0 && !!deal.salesperson && !isNaN(Date.parse(deal.date))
}

export function processDeals(deals: StandardizedDeal[]): StandardizedDeal[] {
  return deals.filter(validateDeal)
}
