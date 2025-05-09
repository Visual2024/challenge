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
        <TableRow key={`empty-${i}`} className="h-8">
          <TableCell colSpan={6}>&nbsp;</TableCell>
        </TableRow>
      )
    }
  })

  const totalCommission = deals.reduce(
    (sum, deal) => sum + deal.commission,
    0
  )


  const getPageNumbers = () => {
    const maxPagesToShow = 5 // Mostrar siempre 5 números
    const pages = []

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    let endPage = startPage + maxPagesToShow - 1

    // Asegurarse de no pasarnos del total de páginas
    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    // Generar el rango dinámico
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  const t = useTranslations("DealTable")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              {/* <span>{t("DealsCommissions")}</span> */}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[500px]">
          <Table className="h-full">
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
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {getPageNumbers().map((page, index) => (
                    <PaginationItem key={index}>
                      {page === "..." ? (
                        <span className="mx-1 px-2 text-sm text-gray-500">
                          •••
                        </span>
                      ) : (
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            handlePageClick(page as number)
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      )}
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
        </CardContent>
      </Card>

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