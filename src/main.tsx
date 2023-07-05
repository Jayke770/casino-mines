import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./styles.css"
import { AnimatePresence } from 'framer-motion'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AnimatePresence key={"app"}>
      <App />
    </AnimatePresence>
  </React.StrictMode>
)
