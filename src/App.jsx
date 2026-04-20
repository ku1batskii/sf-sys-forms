import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Hosting from "./pages/hosting"
import LiderKrovlya from "./pages/lider-krovlya"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/hosting" element={<Hosting />} />
        <Route path="/lider-krovlya" element={<LiderKrovlya />} />
        {/* НОВЫЕ СТРАНИЦЫ ДОБАВЛЯЕШЬ ЗДЕСЬ */}
        <Route path="*" element={<Navigate to="/hosting" />} />
      </Routes>
    </BrowserRouter>
  )
}