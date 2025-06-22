import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ContextProvider } from './contextApi/ContextApi.jsx'
import './index.css'
import App from './App.jsx'
import { QueryClient,QueryClientProvider } from 'react-query'

// creates instance of query Client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client = {queryClient}>
    <ContextProvider>
      <App />
      </ContextProvider>
    </QueryClientProvider>    
  </StrictMode>,
)
