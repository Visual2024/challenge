import { StandardizedDeal } from "@/interfaces/deals";
import type { CrmADealInput } from "@/interfaces/jsonSchema";
import { COMMISSION_RATE } from "../data-transformer";

export function transformCrmAData(data: CrmADealInput[], sourceName: string): { valid: StandardizedDeal[], invalid: string[] } {
    const validDeals: StandardizedDeal[] = [];
    const invalidDeals: string[] = [];

    if (!Array.isArray(data)) {
        throw new Error("Los datos deben ser un array de deals");
    }

    data.forEach((deal, index) => {
        const isValid =
            typeof deal.id === "string" &&
            deal.id.trim().length > 0 &&
            typeof deal.monto === "number" &&
            deal.monto >= 0 &&
            typeof deal.vendedor === "string" &&
            deal.vendedor.trim().length > 0 &&
            typeof deal.fecha === "string" &&
            !isNaN(Date.parse(deal.fecha));

        if (isValid) {
            validDeals.push({
                id: deal.id,
                amount: deal.monto,
                salesperson: deal.vendedor,
                date: deal.fecha,
                commission: deal.monto * COMMISSION_RATE,
                source: sourceName,
            });
        } else {
            invalidDeals.push(`Fila ${index + 1}: Datos incompletos o inválidos. Formato requerido: { id: string, monto: number, vendedor: string, fecha: string }`);
        }
    });

    return { valid: validDeals, invalid: invalidDeals };
}
