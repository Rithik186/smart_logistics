import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { LanguageProvider } from "@/lib/language-context"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "SmartLogistics - Box Monitoring System",
  description: "Advanced logistics monitoring system for returnable delivery boxes with QR/RFID tracking",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`} suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${dmSans.style.fontFamily};
  --font-sans: var(--font-dm-sans);
  --font-serif: var(--font-space-grotesk);
}
        `}</style>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
