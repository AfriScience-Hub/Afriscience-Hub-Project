import type { Metadata } from 'next'
import { AuthProvider } from './context/AuthContext'
import { Layout } from './components/Layout'
import { Toaster } from 'sonner'
import { ScrollToTop } from './components/ScrollToTop'
import '../styles/index.css'

export const metadata: Metadata = {
  title: 'AFRISCIENCE HUB',
  description: 'Afriscience Hub is a platform dedicated to showcasing and promoting scientific research, innovation, and collaboration across Africa. Our mission is to connect researchers, institutions, and industry partners to foster a vibrant scientific community that drives progress and development on the continent.',
  icons: "/littleLogo.png",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ScrollToTop />
        <AuthProvider>
          <Toaster position="top-right" richColors closeButton />
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  )
}
