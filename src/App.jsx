import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Hosting from "./pages/hosting"
import LiderKrovlya from "./pages/lider-krovlya"
import Avtopark from "./pages/avtopark"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/hosting" element={<Hosting />} />
        <Route path="/lider-krovlya" element={<LiderKrovlya />} />
        <Route path="/avtopark" element={<Avtopark />} />
        {/* НОВЫЕ СТРАНИЦЫ ДОБАВЛЯЕШЬ ЗДЕСЬ */}
        <Route path="*" element={<Navigate to="/hosting" />} />
      </Routes>
    </BrowserRouter>
  )
}