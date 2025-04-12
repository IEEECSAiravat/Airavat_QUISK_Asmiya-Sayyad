import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
// import Hatbot from "@/components/hatbot";
import ChatbotWidget from "@/components/chatbotWidget"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SkillSakhi - Empowering Skills Development",
  description: "Learn and grow with SkillSakhi's personalized learning platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
        {/* <Hatbot /> */}
        <ChatbotWidget />
       
      </body>
    </html>
  )
}
