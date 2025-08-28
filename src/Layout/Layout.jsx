import { Outlet } from "react-router-dom"
import { Nav } from "../Components/Navigation/Nav"
export const Leyout = () => {
    return (
        <div>
            <Outlet/>
            <Nav/>
        </div>
    )
}