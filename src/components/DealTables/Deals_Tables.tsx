"use client"

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
  TableRow,
} from "../index"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/UI/pagination"
import { useState } from "react"
import { useTranslations } from "next-intl"

export function DealTable({ deals }: DealTableProps) {
  const itemsPerPage = 10
  const totalPages = Math.ceil(deals.length / itemsPerPage)

  const [currentPage, setCurrentPage] = useState(1)

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
  }

  // Obtener los registros que se mostrarán en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentDeals = deals.slice(startIndex, startIndex + itemsPerPage)

  // Rellenar hasta 10 filas con placeholders si hay menos elementos
  const rowsToDisplay = Array.from({ length: 10 }).map((_, i) => {
    if (i < currentDeals.length) {
      const deal = currentDeals[i]
      return (
        <TableRow key={`deal-${i}-${deal.id}`}>
          <TableCell>{deal.id}</TableCell>
          <TableCell>
            {new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "ARS",
            }).format(deal.amount)}
          </TableCell>
          <TableCell>{deal.salesperson}</TableCell>
          <TableCell>
            {new Date(deal.date).toLocaleDateString("es-AR")}
          </TableCell>
          <TableCell>
            {new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "ARS",
            }).format(deal.commission)}
          </TableCell>
          <TableCell>{deal.source}</TableCell>
        </TableRow>
      )
    } else {
      return (
        <TableRow key={`empty-${i}`} className="h-12">
          <TableCell colSpan={6}>&nbsp;</TableCell>
        </TableRow>
      )
    }
  })

  const totalCommission = currentDeals.reduce(
    (sum, deal) => sum + deal.commission,
    0
  )

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
        <CardContent className="h-[520px]">
          <Table className="h-full">
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
            <TableBody>{rowsToDisplay}</TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Paginación */}
      {deals.length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    goToPreviousPage()
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageClick(i + 1)
                    }}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    goToNextPage()
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {currentDeals.length > 0 && (
        <Card className="bg-green-50">
          <CardHeader>
            <CardTitle>{t("totalCommissions")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
              }).format(totalCommission)}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}