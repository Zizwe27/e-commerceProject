import './globals.css'
import ErrorBoundary from '../Components/ErrorBoundary'

export const metadata = {
  title: 'E-commerce Project',
  description: 'E-commerce management system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
} 