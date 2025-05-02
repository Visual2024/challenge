'use client'
import { Button } from "@/components/UI/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();

  const nameDesig = pathname.split("/").slice(1).join(" ").toLocaleUpperCase();

  return (
    <header className="flex items-center justify-between  border-b">
      <div className="flex flex-row items-center  content-center gap-x-4 text-xl font-bold">
        <div className="flex flex-row items-center">
          <Image width={60} height={100} alt="" src="/logo/Logo.png" />
          <h2 className="text-2xl">{t('comment')}</h2>
        </div>
        <nav className="hidden md:flex  gap-6">

          <Link href="#" className="text-sm font-medium hover:text-primary">
            {t('features')}
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            {t('blog')}
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            {t('contact')}
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            {t('resources')}
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1">
              {nameDesig}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={"en"} className="w-full">
              <DropdownMenuItem>
                EN
              </DropdownMenuItem>
            </Link>
            <Link href={"es"} className="w-full">
              <DropdownMenuItem>
                ES
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost">{t('login')}</Button>
        <Button variant="default">{t('book')}</Button>
      </div>
    </header>
  );
}