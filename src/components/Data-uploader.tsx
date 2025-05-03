'use client'
import { useTranslations } from "next-intl"
import type React from "react"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle, Button, Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger, Textarea } from './index'
import { parseCsvData, processDeals } from "@/services/data-transformer"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { transformCrmAData } from "@/services/tranformsJson/transformCrmAData"
import { sampleCrmAData } from "@/interfaces/jsonSchema"

export function DataUploader({setDeals}: { setDeals: (deals: any[]) => void }) {
  const [csvInput, setCsvInput] = useState("")

  const t = useTranslations("DataUploader")

  const sampleJsonData = JSON.stringify(sampleCrmAData, null, 2)
  console.log(sampleJsonData);
  

  const sampleCsvData = `opportunity_id,amount,seller,deal_date
B1,3000,Carlos García,2024/03/03
B2,4500,Maria García,2024/03/04`

  const [jsonInput, setJsonInput] = useState("")
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const loadSampleData = () => {
    setJsonInput(sampleJsonData)
    setCsvInput(sampleCsvData)
    setError(null)
    setSuccess("Sample data loaded successfully!")
  }

  const processJsonData = async (jsonData: any) => {
    try {
      const response = await fetch('http://localhost:3001/api/deals/crma', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error);
      }

      setSuccess(t('successMessage'))
      setError(null);
    } catch (error: any) {
      setError(error.message || t('errorProcessing'));
      setSuccess(null);
    }
  };

  const processCsvData = async (csvData: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/deals/crmb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: csvData }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error);
      }

      setSuccess(t('successMessage'))
      setError(null);
    } catch (error: any) {
      setError(error.message || t('errorProcessing'));
      setSuccess(null);
    }
  };

  const handleJsonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const parsedData = JSON.parse(jsonInput);
      await processJsonData(parsedData);
    } catch (error: any) {
      setError(error.message || t('errorProcessing'));
    } finally {
      setLoading(false);
    }
  };

  const handleCsvSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await processCsvData(csvInput);
    } catch (error: any) {
      setError(error.message || t('errorProcessing'));
    } finally {
      setLoading(false);
    }
  };

  const processAllData = async () => {
    try {
      setError(null)
      setSuccess(null)

      // Process JSON data
      let allDeals: any[] = []
      if (jsonInput.trim()) {
        const parsedJsonData = JSON.parse(jsonInput)
        const transformedJsonData = transformCrmAData(parsedJsonData, "CRM A")
        allDeals = [...allDeals, ...transformedJsonData.valid]
      }

      // Process CSV data
      if (csvInput.trim()) {
        const parsedCsvData = await parseCsvData(csvInput)
        const transformedCsvData = transformCrmBData(parsedCsvData)
        allDeals = [...allDeals, ...transformedCsvData]
      }

      const validDeals = processDeals(allDeals)
      await saveDeals(validDeals.valid)

      setSuccess(`Successfully processed ${validDeals.valid.length} deals from all CRMs`)
    } catch (error) {
      setError(`Error processing data: ${error instanceof Error ? error.message : String(error)}`)
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

          {errorDeals && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t('alertError')}</AlertTitle>
              <AlertDescription>{errorDeals}</AlertDescription>
            </Alert>
          )}

          {loadingDeals && (
            <Alert variant="default">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Loading...</AlertTitle>
              <AlertDescription>Please wait while we process your data.</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t('alertError')}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading && (
            <Alert variant="default">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Loading...</AlertTitle>
              <AlertDescription>Please wait while we process your data.</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle>¡Éxito!</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="json" className="w-full">
            <TabsList>
              <TabsTrigger value="json">JSON (CRM A)</TabsTrigger>
              <TabsTrigger value="csv">CSV (CRM B)</TabsTrigger>
            </TabsList>
            <TabsContent value="json">
              <div className="space-y-2">
                <Textarea
                  placeholder="Pega aquí tu JSON..."
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  rows={10}
                />
                <Button onClick={handleJsonSubmit}>Procesar JSON</Button>
              </div>
            </TabsContent>
            <TabsContent value="csv">
              <div className="space-y-2">
                <Textarea
                  placeholder="Pega aquí tu CSV..."
                  value={csvInput}
                  onChange={(e) => setCsvInput(e.target.value)}
                  rows={10}
                />
                <Button onClick={handleCsvSubmit}>Procesar CSV</Button>
              </div>
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
