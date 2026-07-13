import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Hosting from "./pages/hosting"
import LiderKrovlya from "./pages/lider-krovlya"
import Avtopark from "./pages/avtopark"
import Roman from "./pages/roman"
import MaxBot from "./pages/max-bot"
import MaxBot2 from "./pages/max-bot-2"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/hosting" element={<Hosting />} />
        <Route path="/lider-krovlya" element={<LiderKrovlya />} />
        <Route path="/avtopark" element={<Avtopark />} />
        <Route path="/roman" element={<Roman />} />
        <Route path="/max-bot" element={<MaxBot />} />
        <Route path="/max-bot-2" element={<MaxBot2 />} />
        {/* НОВЫЕ СТРАНИЦЫ ДОБАВЛЯЕШЬ ЗДЕСЬ */}
        <Route path="*" element={<Navigate to="/hosting" />} />
      </Routes>
    </BrowserRouter>
  )
}
