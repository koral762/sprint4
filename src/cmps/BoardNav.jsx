import { NavLink } from 'react-router-dom'

export function BoardNav({  isMobileNavOpen, onToggleMobileNav }) {

    return (
        <nav className={`main-nav ${isMobileNavOpen ? 'open' : ''}`}>
            <ul className="clean-list flex align-center">
                <li onClick={() => onToggleMobileNav()}><NavLink to="/board">Board</NavLink></li>
                <li onClick={() => onToggleMobileNav()}><NavLink to="/about">About</NavLink></li>
            </ul>
        </nav>
    )
}