import './globals.css'
import { FirebaseAuthProvider } from '../src/contexts/FirebaseAuthContext'

export const metadata = {
  title: 'E-commerce Store',
  description: 'Your one-stop shop for everything',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FirebaseAuthProvider>
          {children}
        </FirebaseAuthProvider>
      </body>
    </html>
  )
}