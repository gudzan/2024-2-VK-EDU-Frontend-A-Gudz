import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './hooks/useAuth.jsx'
import './index.scss'
import { ChatsProvider } from './hooks/useChats.jsx'
import { HashRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <ChatsProvider>
          <App />
        </ChatsProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>,
)