import { StandardizedDeal } from "@/interfaces/deals";

export function transformCrmAData(data: Record<string, any>[]): StandardizedDeal[] {
  const standardKeys = ["id", "amount", "salesperson", "date", "commission", "source"];

  return data.map((deal) => {
    const values = Object.values(deal); // Ignora las claves actuales
    const amount = Number(values[1] ?? 0);

    const standardizedDeal: StandardizedDeal = {
      id: String(values[0] ?? ""),
      amount,
      salesperson: String(values[2] ?? ""),
      date: new Date(values[3] ?? new Date()).toISOString(),
      commission: amount * 0.1,
      source: String(values[5] ?? "CRM A"),
    };

    return standardizedDeal;
  });
}
