export interface CrmADealInput {
  id: string;
  monto: number;
  vendedor: string;
  fecha: string;
}

export const sampleCrmAData = [
  {
    id: "A1",
    monto: 5000,
    vendedor: "Juan Pérez",
    fecha: "2024-03-01"
  }
];
