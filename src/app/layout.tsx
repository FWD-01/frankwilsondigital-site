import type { Metadata } from "next"
import { Playfair_Display, DM_Sans, JetBrains_Mono, Caveat } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
})

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
})

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Frank Wilson Digital — Premium Digital Presence for Founders",
  description:
    "A modern digital systems service that helps professionals, solopreneurs, and growing businesses maintain a premium digital presence — without the time, stress, or inconsistency of doing it themselves.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://frankwilsondigital.co.za"
  ),
  openGraph: {
    title: "Frank Wilson Digital",
    description: "Your premium digital presence, handled.",
    type: "website",
    locale: "en_ZA",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-ZA"
      className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
