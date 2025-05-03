import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import './globals.css';
import { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { DealProvider } from '@/contexts/DealContext';

const dm_Sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
}) 

export const metadata: Metadata = {
    title: 'Comment',
    description: 'Calculate your comment score',
    // icono
    icons: {
      icon: '/logo/Logo.png',
      shortcut: '/logo/Logo.png',
      apple: '/logo/Logo.png'
    },
  }

export default async function LocaleLayout({
    children,
    params
  }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;
    if(!hasLocale(routing.locales, locale)) {
      notFound();
  }

return (
  <html lang={locale} className={`${dm_Sans.className}`}>
    <body style={{ fontFamily: 'var(--font-dm-sans)' }}>
      <NextIntlClientProvider>
        <DealProvider>
          {children}
        </DealProvider>
      </NextIntlClientProvider>
    </body>
  </html>
);
}