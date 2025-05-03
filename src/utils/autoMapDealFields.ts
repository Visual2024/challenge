// utils/autoMapFields.ts
import { StandardizedDeal } from "@/interfaces/deals";

export function autoMapDealFields(input: Record<string, any>): Partial<StandardizedDeal> {
  const result: Partial<StandardizedDeal> = {};

  for (const [key, value] of Object.entries(input)) {
    // Detectar ID
    if (!result.id && key.toLowerCase().includes("id")) {
      result.id = String(value);
    }

    // Detectar monto
    if (!result.amount && (key.toLowerCase().includes("monto") || key.toLowerCase().includes("amount"))) {
      const parsed = parseFloat(String(value));
      if (!isNaN(parsed) && parsed > 0) result.amount = parsed;
    }

    // Detectar vendedor
    if (!result.salesperson && (key.toLowerCase().includes("rep") || key.toLowerCase().includes("vendedor") || key.toLowerCase().includes("seller"))) {
      result.salesperson = String(value);
    }

    // Detectar fecha
    if (!result.date && (key.toLowerCase().includes("fecha") || key.toLowerCase().includes("date"))) {
      const date = new Date(String(value));
      if (date.toString() !== "Invalid Date" && !isNaN(date.getTime())) {
        result.date = date.toISOString();
      }
    }
  }

  return result;
}