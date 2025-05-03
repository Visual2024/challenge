import { processDeals } from "@/services/data-transformer"
import { transformCrmAData } from "@/services/tranformsJson/transformCrmAData"
import { useState } from "react"

export function useJsonProcessor({ setDeals }: any) {
  const [jsonInput, setJsonInput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const processJsonData = () => {
    try {
      setError(null)
      console.log("Processing JSON data...", jsonInput);
      const parsedData = JSON.parse(jsonInput)
      console.log("Parsed JSON data:", parsedData);
      const transformedData = transformCrmAData(parsedData, "CRM A")
      console.log("Transformed JSON data:", transformedData);
      const { valid, invalid } = processDeals(transformedData.valid)
      console.log("Valid deals:", valid);
      console.log("Invalid deals:", invalid);

      setDeals((prevDeals: any) =>
        [...prevDeals.filter((deal: any) => deal.source !== "CRM A"), ...valid]
      )

      if (invalid.length > 0) {
        setError(`Algunos deals no son válidos. Verifica los campos requeridos.`)
      }

      setSuccess(`Successfully processed ${valid.length} deals from CRM A`)
    } catch (err) {
      setError(`Error processing JSON data: ${err instanceof Error ? err.message : String(err)}`)
      setSuccess(null)
    }
  }

  return {
    jsonInput,
    setJsonInput,
    processJsonData,
    error,
    success,
    setError,
    setSuccess,
  }
}