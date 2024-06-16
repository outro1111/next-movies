"use client"
import localFont from 'next/font/local'
import "./globals.css"
import Navbar from './components/Navbar'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from "next-auth/react"

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning> {/* 다크모드 next-themes  */}
      <body className={pretendard.className}>
        <SessionProvider>
          <ThemeProvider  enableSystem={true} attribute="class">
            <div id="wrap">
              <Navbar />
              <div id="content">
                {children}
              </div>
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

// export const metadata = {
//   title: "Home | MovieRevue",
//   description: "MovieRevue Homepage",
//   openGraph: {
//     title: 'MovieRevue',
//     description: 'MovieRevue Homepage',
//   },
// }