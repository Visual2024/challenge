'use client'
import { useState } from "react"
import { Hero } from "./Hero/Hero"
import { DataUploader } from "./DataUpload/DataUpload"
import { StandardizedDeal } from "@/interfaces/deals"
import { DealTable } from "./DealTables/Deals_Tables"

export function ClientComponent() {

  const [deals, setDeals] = useState<StandardizedDeal[]>([]);


  return (
    <div className="space-y-8">
      <Hero />
      <DataUploader setDealsAction={setDeals} />
      <DealTable deals={deals} />
    </div>
  );
}
