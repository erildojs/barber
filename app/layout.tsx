import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import { Toaster } from "./_components/ui/sonner"
import { Card, CardContent } from "./_components/ui/card"
import { AuthProvider } from "./_providers/auth"

const nunito = Nunito({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Barber",
  description: "Agendamentos de barbearia.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-AO" className="dark">
      <body className={nunito.className}>
        <AuthProvider>
          <div className="flex h-full flex-col">
            <div className="flex-1">{children}</div>

            <footer>
              <Card className="sm:rounded-none">
                <CardContent className="px-5 py-6">
                  <p className="text-sm text-gray-400">
                    {" "}
                    2025 &copy; Copyright{" "}
                    <span className="font-bold">Barber</span>
                  </p>
                </CardContent>
              </Card>
            </footer>
          </div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
