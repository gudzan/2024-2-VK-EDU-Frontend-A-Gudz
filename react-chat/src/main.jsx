import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { PageProvider } from './hooks/usePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageProvider>
      <App />
    </PageProvider>
  </StrictMode>,
)