'use client'
import { DealTableProps } from "@/interfaces/deals"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../index"
import { useTranslations } from "next-intl"



export function DealTable({ deals }: DealTableProps) {
  const totalCommission = deals.reduce((sum, deal) => sum + deal.commission, 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-AR")
  }

  const t = useTranslations("DealTable")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <span>{t("DealsCommissions")}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>{t("listStadar")}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>{t("amount")}</TableHead>
                <TableHead>{t("salesperson")}</TableHead>
                <TableHead>{t("date")}</TableHead>
                <TableHead>{t("commission")}</TableHead>  
                <TableHead>{t("source")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.length > 0 ? (
                deals.map((deal) => (
                  <TableRow key={`${deal.source}-${deal.id}`}>
                    <TableCell>{deal.id}</TableCell>
                    <TableCell>{formatCurrency(deal.amount)}</TableCell>
                    <TableCell>{deal.salesperson}</TableCell>
                    <TableCell>{formatDate(deal.date)}</TableCell>
                    <TableCell>{formatCurrency(deal.commission)}</TableCell>
                    <TableCell>{deal.source}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No deals to display. Upload CRM data to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {deals.length > 0 && (
        <Card className="bg-green-50">
          <CardHeader>
            <CardTitle>{t("totalCommissions")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalCommission)}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}