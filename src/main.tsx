import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BookingForm from './Components/BookingForm.tsx'
import ChatBot from './Components/ChatBot.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookingForm />
    <ChatBot />
  </StrictMode>,
)
