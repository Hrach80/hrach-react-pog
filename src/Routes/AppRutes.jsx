import { Route, Routes } from "react-router-dom"
import ExanakPages from "../Pages/ExanakPages/ExanakPages"
import TaradramPages from "../Pages/TaradramPages/TradramPages"
export const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/weather" element={<ExanakPages />} />
                <Route path="/currency" element={<TaradramPages />} />
            </Routes>
        </div>
    )
}