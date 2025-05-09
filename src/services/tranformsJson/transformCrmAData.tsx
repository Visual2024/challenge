import { CrmADeal, StandardizedDeal } from "@/interfaces/deals";

export function transformCrmAData(data: CrmADeal[]): StandardizedDeal[] {
  return data.map((deal) => {
    const values = Object.values(deal);

    // Aseguramos que amount es un número
    const amount = Number(values[1] ?? 0);
    
    // Manejo seguro de la fecha
    const rawDate = values[3];
    let parsedDate: Date;
    
    if (rawDate === null || rawDate === undefined) {
      parsedDate = new Date();
    } else if (typeof rawDate === "string" || typeof rawDate === "number") {
      parsedDate = new Date(rawDate);
    } else if (Object.prototype.toString.call(rawDate) === "[object Date]") {
      // Comprobación segura de Date sin usar instanceof
      parsedDate = rawDate as unknown as Date;
    } else {
      parsedDate = new Date();
    }
    
    const standardizedDeal: StandardizedDeal = {
      id: String(values[0] ?? ""),
      amount,
      salesperson: String(values[2] ?? ""),
      date: parsedDate.toISOString(),
      commission: amount * 0.1,
      source: String(values[5] ?? "CRM A"),
    };

    return standardizedDeal;
  });
}