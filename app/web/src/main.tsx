import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = createRoot(document.getElementById('root')!)

// PROTOTYPE — dev-only throwaway route for the home UI prototype (see src/prototype/home).
if (import.meta.env.DEV && location.pathname.startsWith('/prototype/home')) {
  import('./prototype/home/PrototypeHome.tsx').then(({ default: PrototypeHome }) =>
    root.render(<StrictMode><PrototypeHome /></StrictMode>),
  )
} else {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
