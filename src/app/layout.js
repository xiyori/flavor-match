import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// import CustomFont from 'next/font/local'
// const myFont = CustomFont({ src: '../public/fonts/BAHNSCHRIFT.TTF' })

export const metadata = {
  title: 'FlavorMatch',
  description: 'Save time, swipe!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
