import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/config'
import App from './App'
import { ThemeProvider } from './components/theme-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <React.Suspense fallback="Loading...">
      <ThemeProvider defaultTheme="dark">
        <App />
      </ThemeProvider>
    </React.Suspense>
  </StrictMode>,
)
