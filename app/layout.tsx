import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Slijpwerk Achterhoek | Professionele Slijpservice',
  description: 'Uw slijpservice in de buurt. Professioneel slijpen van messen, scharen en tuingereedschap.',
  icons: {
    icon: '/favoriet.png',
  },
  openGraph: {
    title: 'Slijpwerk Achterhoek | Professionele Slijpservice',
    description: 'Uw slijpservice in de buurt. Professioneel slijpen van messen, scharen en tuingereedschap.',
    images: ['/Tweede.png'],
  },
  twitter: {
    card: 'summary',
    title: 'Slijpwerk Achterhoek | Professionele Slijpservice',
    description: 'Uw slijpservice in de buurt. Professioneel slijpen van messen, scharen en tuingereedschap.',
    images: ['/Tweede.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
