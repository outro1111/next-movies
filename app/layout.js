import localFont from 'next/font/local'
import "./globals.css"
import Navbar from './components/Navbar'

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={pretendard.className}>
        <div id="wrap">
          <Navbar />
          <div id="content">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Home | MovieRevue",
  description: "MovieRevue Homepage",
  openGraph: {
    title: 'MovieRevue',
    description: 'MovieRevue Homepage',
  },
}