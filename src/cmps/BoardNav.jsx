import { NavLink } from 'react-router-dom'

export function MainNav({  isMobileNavOpen, onToggleMobileNav }) {

    return (
        <nav className={`main-nav ${isMobileNavOpen ? 'open' : ''}`}>
            <ul className="clean-list flex align-center">
                <li onClick={() => onToggleMobileNav()}><NavLink to="/toy">Store</NavLink></li>
                <li onClick={() => onToggleMobileNav()}><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li onClick={() => onToggleMobileNav()}><NavLink to="/about">About</NavLink></li>
            </ul>
        </nav>
    )
}