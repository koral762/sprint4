// import { NavLink } from 'react-router-dom'

export function BoardNav({ isMobileNavOpen, onToggleMobileNav }) {

    return (
        <nav className={`main-nav ${isMobileNavOpen ? 'open' : ''}`}>
        </nav>
    )
}