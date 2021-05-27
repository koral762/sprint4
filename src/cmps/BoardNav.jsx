import { NavLink } from 'react-router-dom'

export function BoardNav({ isMobileNavOpen, onToggleMobileNav }) {

    return (
        <nav className={`flex app-header ${isMobileNavOpen ? 'open' : ''}`}>
            <ul className="clean-list flex align-center">
                {/* <li onClick={() => onToggleMobileNav()}><NavLink to="/board">Board</NavLink></li> */}
                <li ><NavLink to="/board">Board</NavLink></li>
                <li ><NavLink to="/about">About</NavLink></li>
            </ul>
        </nav>
    )
}