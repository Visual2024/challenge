import { CrmBDeal, StandardizedDeal } from "@/interfaces/deals"
import Papa from 'papaparse'

export function transformCrmBData(data: CrmBDeal[]): StandardizedDeal[] {
  return data.map((deal) => {
    const amount = Number(deal.amount)

    // Format date to ISO string (handling different date formats)
    let dateObj
    try {
      // Handle date format YYYY/MM/DD
      dateObj = new Date(deal.deal_date.replace(/\//g, "-"))
    } catch (err) {
      dateObj = new Date()
      console.error(err)
    }

    return {
      id: deal.opportunity_id,
      amount,
      salesperson: deal.seller,
      date: dateObj.toISOString(),
      commission: amount * 0.1,
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
      error: (error: object) => {
        reject(error)
      },
    })
  })
}