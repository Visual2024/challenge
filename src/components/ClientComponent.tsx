'use client'
import { StandardizedDeal } from "@/interfaces/deals"
import { useState } from "react"
import { DataUploader } from "./Data-uploader"
import { DealTable } from "./Deal_table"
import { Header } from "./layout/Header/Header"
import { Hero } from "./Hero/Hero"

export function ClientComponent() {
  const [deals, setDeals] = useState<StandardizedDeal[]>([])

  return (
    <div className="space-y-8">
      <Header />
      <Hero />
      <DataUploader setDeals={setDeals} />
      <DealTable deals={deals} />
    </div>
  )
}
