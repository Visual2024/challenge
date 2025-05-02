"use client"
import { useTranslations } from "next-intl"
import type React from "react"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle, Button, Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger, Textarea } from './index'
import type { DataUploaderProps, StandardizedDeal } from "@/interfaces/deals"
import { transformCrmAData, transformCrmBData, parseCsvData, processDeals } from "@/services/data-transformer"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import user from "../mock/deals.json"


export function DataUploader({ setDeals }: DataUploaderProps) {
  const [jsonInput, setJsonInput] = useState("")
  const [csvInput, setCsvInput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const date = user

  const t = useTranslations("DataUploader")

  const sampleJsonData = JSON.stringify(user, null, 2,)

  const sampleCsvData = `opportunity_id,amount,seller,deal_date
B1,3000,Carlos García,2024/03/03
B2,4500,Maria García,2024/03/04`

  const loadSampleData = () => {
    setJsonInput(sampleJsonData)
    setCsvInput(sampleCsvData)
    setError(null)
    setSuccess("Sample data loaded successfully!")
  }

  const processJsonData = () => {
    try {
      setError(null)
      const parsedData = JSON.parse(jsonInput)
      const transformedData = transformCrmAData(parsedData)
      const validDeals = processDeals(transformedData)

      setDeals((prevDeals) => {
        // Filter out any existing CRM A deals to avoid duplicates
        const filteredDeals = prevDeals.filter((deal) => deal.source !== "CRM A")
        return [...filteredDeals, ...validDeals]
      })

      setSuccess(`Successfully processed ${validDeals.length} deals from CRM A`)
    } catch (err) {
      setError(`Error processing JSON data: ${err instanceof Error ? err.message : String(err)}`)
      setSuccess(null)
    }
  }

  const processCsvData = async () => {
    try {
      setError(null)
      const parsedData = await parseCsvData(csvInput)
      const transformedData = transformCrmBData(parsedData)
      const validDeals = processDeals(transformedData)

      setDeals((prevDeals) => {
        // Filter out any existing CRM B deals to avoid duplicates
        const filteredDeals = prevDeals.filter((deal) => deal.source !== "CRM B")
        return [...filteredDeals, ...validDeals]
      })

      setSuccess(`Successfully processed ${validDeals.length} deals from CRM B`)
    } catch (err) {
      setError(`Error processing CSV data: ${err instanceof Error ? err.message : String(err)}`)
      setSuccess(null)
    }
  }

  const processAllData = async () => {
    try {
      setError(null)
      setSuccess(null)

      // Process JSON data
      let allDeals: StandardizedDeal[] = []
      if (jsonInput.trim()) {
        const parsedJsonData = JSON.parse(jsonInput)
        const transformedJsonData = transformCrmAData(parsedJsonData)
        allDeals = [...allDeals, ...transformedJsonData]
      }

      // Process CSV data
      if (csvInput.trim()) {
        const parsedCsvData = await parseCsvData(csvInput)
        const transformedCsvData = transformCrmBData(parsedCsvData)
        allDeals = [...allDeals, ...transformedCsvData]
      }

      const validDeals = processDeals(allDeals)
      setDeals(validDeals)

      setSuccess(`Successfully processed ${validDeals.length} deals from all CRMs`)
    } catch (err) {
      setError(`Error processing data: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('cardTitle')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={loadSampleData} variant="outline">
            {t('sampleButton')}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t('AlertError')}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600">Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="json">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="json">CRM A (JSON)</TabsTrigger>
              <TabsTrigger value="csv">CRM B (CSV)</TabsTrigger>
            </TabsList>
            <TabsContent value="json" className="space-y-4">
              <Textarea
                placeholder="Paste JSON data here..."
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={10}
              />
              <Button onClick={processJsonData}>{t('buttonProcess')}</Button>
            </TabsContent>
            <TabsContent value="csv" className="space-y-4">
              <Textarea
                placeholder="Paste CSV data here..."
                value={csvInput}
                onChange={(e) => setCsvInput(e.target.value)}
                rows={10}
              />
              <Button onClick={processCsvData}>Process CSV Data</Button>
            </TabsContent>
          </Tabs>

          <div className="pt-4">
            <Button onClick={processAllData} className="w-full">
              Process All Data
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
