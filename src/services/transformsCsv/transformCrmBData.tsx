import { CrmBDeal, StandardizedDeal } from "@/interfaces/deals"
import { COMMISSION_RATE } from "../data-transformer"

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