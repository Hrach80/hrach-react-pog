import { Link } from "react-router-dom"
import "../Navigation/Nav.css"

export const Nav = () => {
    return (
        <div className="nav-box">
            <Link className="nav-link" to="/weather">Եղանակ</Link>
            <Link className="nav-link" to="/currency">Տարադրամի Փոխարժեք</Link>
        </div>
    )
}