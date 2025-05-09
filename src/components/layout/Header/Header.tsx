'use client';

import { useState } from "react";
import { Button } from "@/components/UI/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const nameDesig = pathname.split("/").slice(1).join(" ").toLocaleUpperCase();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="flex items-center fixed bg-white w-full z-100 justify-between max-w-full px-4 py-3 border-b  md:px-8 overflow-x-hidden">
        <div className="flex items-center gap-x-4">
          <div className="flex items-center">
            <Image width={60} height={100} alt="" src="/logo/Logo.png" />
            <h2 className="ml-2 text-2xl font-bold md:opacity-0 lg:opacity-100">{t("comment")}</h2>
          </div>

          <nav className="hidden md:flex gap-6 ml-6">
            <Link href="#" className="text-sm font-medium hover:text-primary">{t("features")}</Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">{t("blog")}</Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">{t("contact")}</Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">{t("resources")}</Link>
          </nav>
        </div>

        {/* Ícono de menú móvil */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        {/* Acciones desktop */}
        <div className="hidden md:flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1">
                {nameDesig}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={"en"} className="w-full"><DropdownMenuItem>EN</DropdownMenuItem></Link>
              <Link href={"es"} className="w-full"><DropdownMenuItem>ES</DropdownMenuItem></Link>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost">{t("login")}</Button>
          <Button variant="default">{t("book")}</Button>
        </div>
      </header>

      {/* Overlay + Menú deslizante */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay semitransparente */}
          <div
            className="fixed inset-0 bg-black opacity-5 bg-opacity-50 z-40 "
            onClick={closeMenu}
          />

          {/* Menú lateral derecho */}
          <div className="fixed top-0 right-0 h-full w-1/2  bg-white z-50 shadow-lg transition-transform duration-300 transform translate-x-0">
            <div className="flex justify-end p-4">
              <button onClick={closeMenu}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-4 px-6">
              <Link href="#" className="text-sm font-medium hover:text-primary" onClick={closeMenu}>{t("features")}</Link>
              <Link href="#" className="text-sm font-medium hover:text-primary" onClick={closeMenu}>{t("blog")}</Link>
              <Link href="#" className="text-sm font-medium hover:text-primary" onClick={closeMenu}>{t("contact")}</Link>
              <Link href="#" className="text-sm font-medium hover:text-primary" onClick={closeMenu}>{t("resources")}</Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1">
                    {nameDesig}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <Link href={"en"} className="w-full"><DropdownMenuItem onClick={closeMenu}>EN</DropdownMenuItem></Link>
                  <Link href={"es"} className="w-full"><DropdownMenuItem onClick={closeMenu}>ES</DropdownMenuItem></Link>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" onClick={closeMenu}>{t("login")}</Button>
              <Button variant="default" onClick={closeMenu}>{t("book")}</Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
