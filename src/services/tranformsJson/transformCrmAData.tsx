import { CrmADeal, StandardizedDeal } from "@/interfaces/deals"

export function transformCrmAData(data: CrmADeal[]): StandardizedDeal[] {
  return data.map((deal) => {
    const amount = deal.total || deal.amount || 0
    const date = deal.sold_at || deal.created_on || new Date().toISOString()

    console.log(amount);
    console.log(date);
    
    

    return {
      id: deal.deal_id,
      amount,
      salesperson: deal.rep_name,
      date: new Date(date).toISOString(),
      commission: amount * 0.1,
      source: "CRM A",
    }
  })
}
