"use client"
// import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/utils/Sidebar"

import { Providers } from "./providers"
import { usePathname } from "next/navigation"
import { AdminDetailsProvider } from "@/utils/AuthContext"
import { AuthProvider } from "@/utils/AuthValidation"
import { Provider } from "@/providers/Providers"
import { SidebarDataProvider } from "@/Contexts/SidebarContext"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"
  const isForgotPasswordPage = pathname === "/forgot-password"

  const isVerifyPage = pathname === "/verify"
  const isChangePasswordPage = pathname === "/change-password"

  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <AuthProvider>
            <SidebarDataProvider>
              <AdminDetailsProvider>
                <Providers />
                <SidebarProvider>
                  {!isLoginPage &&
                    !isForgotPasswordPage &&
                    !isVerifyPage &&
                    !isChangePasswordPage && (
                      <>
                        <AppSidebar />
                        <SidebarTrigger />
                      </>
                    )}

                  {children}
                </SidebarProvider>
              </AdminDetailsProvider>
            </SidebarDataProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  )
}
