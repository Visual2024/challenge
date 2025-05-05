'use client'
import { StandardizedDeal } from "@/interfaces/deals"
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

interface DealTableProps {
  deals: StandardizedDeal[]
}

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <span>Deals and Commissions</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>List of all standardized deals</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Salesperson</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Commission (10%)</TableHead>  
                <TableHead>Source</TableHead>
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
            <CardTitle>Total Commissions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(totalCommission)}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}