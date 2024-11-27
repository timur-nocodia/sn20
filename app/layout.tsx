import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/layout-components/providers/theme-provider';
import { Toaster } from '@/components/ui-components/toast/toaster';
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Skillnetwork',
  description: 'Your social media management platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          forcedTheme="light"
          disableTransitionOnChange
        >
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}