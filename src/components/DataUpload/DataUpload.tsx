"use client"
import { StandardizedDeal } from "@/interfaces/deals"
import { transformCrmAData } from "@/services/tranformsJson/transformCrmAData"
import type React from "react"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle, Button, Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '..'
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { processDeals } from "@/validations/validation"
import { parseCsvData, transformCrmBData } from "@/services/transformsCsv/transformCrmBData"
import user from '../../mock/deals.json'
import { useTranslations } from "next-intl"

interface DataUploaderProps {
    setDealsAction: React.Dispatch<React.SetStateAction<StandardizedDeal[]>>
}

export function DataUploader({ setDealsAction }: DataUploaderProps) {
    const [jsonInput, setJsonInput] = useState("")
    const [csvInput, setCsvInput] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const t = useTranslations("DataUploader")
    const date = JSON.stringify(user, null, 2)

    const sampleCsvData = `opportunity_id,amount,seller,deal_date
B1,3000,Carlos García,2024/03/03
B2,4500,Maria García,2024/03/04`

    const loadSampleData = () => {
        setJsonInput(date)
        setCsvInput(sampleCsvData)
        setError(null)
        setSuccess("Sample data loaded successfully!")
    }

    const processJsonData = async () => {
        try {
            setError(null);
            setLoading(true);

            const parsedData = JSON.parse(jsonInput);
            const transformedData = transformCrmAData(parsedData);
            const validDeals = processDeals(transformedData);

            setDealsAction(validDeals);
            setSuccess(`Successfully processed ${validDeals.length} deals from CRM A`);
        } catch (err) {
            setError(`Error processing JSON data: ${err instanceof Error ? err.message : String(err)}`);
            setSuccess(null);
        } finally {
            setLoading(false);
        }
    };

    const processCsvData = async () => {
        try {
            setError(null)
            setLoading(true)
            const parsedData = await parseCsvData(csvInput)
            const transformedData = transformCrmBData(parsedData)
            const validDeals = processDeals(transformedData)

            setDealsAction((prevDeals) => {
                // Filter out any existing CRM B deals to avoid duplicates
                const filteredDeals = prevDeals.filter((deal) => deal.source !== "CRM B")
                return [...filteredDeals, ...validDeals]
            })

            setSuccess(`Successfully processed ${validDeals.length} deals from CRM B`)
        } catch (err) {
            setError(`Error processing CSV data: ${err instanceof Error ? err.message : String(err)}`)
            setSuccess(null)
        } finally {
            setLoading(false)
        }
    }

    const processAllData = async () => {
        try {
            setError(null)
            setSuccess(null)
            setLoading(true)

            // Process JSON data
            let allDeals: StandardizedDeal[] = []
            if (jsonInput.trim()) {
                const parsedJsonData = JSON.parse(jsonInput)
                console.log("ParseDate ALL: ", parsedJsonData);

                const transformedJsonData = transformCrmAData(parsedJsonData)
                console.log(transformedJsonData);

                allDeals = [...allDeals, ...transformedJsonData]
            }

            // Process CSV data
            if (csvInput.trim()) {
                const parsedCsvData = await parseCsvData(csvInput)
                const transformedCsvData = transformCrmBData(parsedCsvData)
                allDeals = [...allDeals, ...transformedCsvData]
            }

            const validDeals = processDeals(allDeals)
            console.log(validDeals);

            setDealsAction(validDeals)

            setSuccess(`Successfully processed deals from all CRMs`)
        } catch (err) {
            setError(`Error processing data: ${err instanceof Error ? err.message : String(err)}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("cardTitle")}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                        <Button onClick={loadSampleData} variant="outline">
                            {t("loadSampleDate")}
                        </Button>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="json-examples">
                                <AccordionTrigger>
                                    <p className="no-underline hover:no-underline border-2 p-2 rounded-md px-3">{t("ejemploStruture")}</p>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-4">
                                        <Card className="border-gray-200">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-sm font-medium">Ejemplo</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <pre className="bg-gray-100 p-2 rounded text-sm">
                                                    {`
{
    "deal_id": "A1",
    "total": 5000,
    "rep_name": "Ana Pérez",
    "sold_at": "2024-03-01"
}`}
                                                </pre>
                                            </CardContent>
                                        </Card>

                                        <Alert variant="default" className="bg-blue-50 border-blue-200">
                                            <AlertDescription className="text-sm text-gray-600">
                                                {t("noteExampleStruture")}
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {success && (
                        <Alert className="bg-green-50 border-green-200">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertTitle className="text-green-600">{t("success")}</AlertTitle>
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
                                placeholder={t("placeholderTextAreaJson")}
                                value={jsonInput}
                                onChange={(e) => setJsonInput(e.target.value)}
                                className="max-h-60 overflow-y-auto"
                            />
                            <Button onClick={processJsonData} disabled={loading}>
                                {loading ? `${t("loading")}` : `${t("readyTextJson")}`}
                            </Button>
                        </TabsContent>
                        <TabsContent value="csv" className="space-y-4">
                            <Textarea
                                placeholder={t("placeholderTextAreaCsv")}
                                value={csvInput}
                                onChange={(e) => setCsvInput(e.target.value)}
                                className="max-h-60 overflow-y-auto"
                            />
                            <Button onClick={processCsvData} disabled={loading}>
                                {loading ? `${t("loading")}` : `${t("readyTextCsv")}`}
                            </Button>
                        </TabsContent>
                    </Tabs>

                    <div className="pt-4">
                        <Button onClick={processAllData} className="w-full" disabled={loading}>
                            {loading ? `${t("loading")}` : `${t("processAllData")}`}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
