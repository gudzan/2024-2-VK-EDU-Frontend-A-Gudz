import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './hooks/useAuth.jsx'
import './index.scss'
import { ChatsProvider } from './hooks/useChats.jsx'
import { HashRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import { store } from './store/createStore.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Provider store={store}>
        {/* <AuthProvider> */}
          <ChatsProvider>
            <App />
          </ChatsProvider>
        {/* </AuthProvider> */}
      </Provider>
    </HashRouter>
  </StrictMode>,
)