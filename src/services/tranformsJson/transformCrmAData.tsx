import { CrmADeal, StandardizedDeal } from "@/interfaces/deals"
import { standardizeKeys } from "@/utils/standardizeKeys"

export function transformCrmAData(data: CrmADeal[]): StandardizedDeal[] {
  console.log("Datos originales:", data);

  return data.map((deal) => {

    // Primero estandarizamos las claves
    const standardizedDeal = standardizeKeys<Partial<StandardizedDeal>>(deal);

    // Luego creamos el objeto final con valores por defecto
    const finalDeal = {
      id: String(standardizedDeal.id || ""),
      amount: Number(standardizedDeal.amount || 0),
      salesperson: String(standardizedDeal.salesperson || ""),
      date: new Date(standardizedDeal.date || new Date()).toISOString(),
      commission: Number(standardizedDeal.amount || 0) * 0.1,
      source: "CRM A"
    } as StandardizedDeal;

    console.log("Deal final transformado:", finalDeal);
    return finalDeal;
  });
}