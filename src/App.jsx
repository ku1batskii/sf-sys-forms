import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Hosting from './pages/hosting'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/hosting" element={<Hosting />} />
        {/* НОВЫЕ СТРАНИЦЫ ДОБАВЛЯЕШЬ ЗДЕСЬ: */}
        {/* <Route path="/office-it" element={<OfficeIT />} /> */}
        <Route path="*" element={<Navigate to="/hosting" />} />
      </Routes>
    </BrowserRouter>
  )
}
