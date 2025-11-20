import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@flaticon/flaticon-uicons/css/all/all.css';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.jsx';
import CustomQueryClientProvider from './context/QueryClientProvider.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CustomQueryClientProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </CustomQueryClientProvider>
  </StrictMode>,
)
