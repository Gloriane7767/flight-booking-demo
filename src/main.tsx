import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BookingForm from './BookingForm.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookingForm />
  </StrictMode>,
)
