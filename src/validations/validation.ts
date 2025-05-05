import { StandardizedDeal } from "@/interfaces/deals"

// Validate deal data
export function validateDeal(deal: StandardizedDeal): boolean {
  const hasValidId = typeof deal.id === 'string' && deal.id.trim().length > 0;
  
  const hasValidAmount = typeof deal.amount === 'number' && !isNaN(deal.amount) && deal.amount >= 0;
  
  const hasValidSalesperson = typeof deal.salesperson === 'string' && deal.salesperson.trim().length > 0;
  
  // Validación adaptativa para la fecha
  const hasValidDate = (() => {
    try {
      if (!deal.date) return false;
      const parsedDate = new Date(deal.date);
      return !isNaN(parsedDate.getTime());
    } catch {
      return false;
    }
  })();
  
  return hasValidId && hasValidAmount && hasValidSalesperson && hasValidDate;
}

// Filter valid deals and handle errors
export function processDeals(deals: StandardizedDeal[]): StandardizedDeal[] {
  return deals.filter(validateDeal)
}