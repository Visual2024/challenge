import { StandardizedDeal } from "@/interfaces/deals"

// Validate deal data
export function validateDeal(deal: StandardizedDeal): boolean {
  return !!deal.id && !isNaN(deal.amount) && deal.amount > 0 && !!deal.salesperson && !isNaN(Date.parse(deal.date))
}

// Filter valid deals and handle errors
export function processDeals(deals: StandardizedDeal[]): StandardizedDeal[] {
  return deals.filter(validateDeal)
}