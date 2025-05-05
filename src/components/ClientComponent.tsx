'use client'
import { useState } from "react"
import { Header } from "./layout/Header/Header"
import { Hero } from "./Hero/Hero"
import { DataUploader } from "./DataUpload/DataUpload"
import { StandardizedDeal } from "@/interfaces/deals"
import { DealTable } from "./DealTables/Deals_Tables"
import { Footer } from "./layout/Footer/Footer"

export function ClientComponent() {

  const [deals, setDeals] = useState<StandardizedDeal[]>([]);


  return (
    <div className="space-y-8">
      <Header />
      <Hero />
      <DataUploader setDealsAction={setDeals} />
      <DealTable deals={deals} />
      <Footer />
    </div>
  );
}
