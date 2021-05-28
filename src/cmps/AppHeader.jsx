import { Link } from 'react-router-dom'

export function AppHeader(props) {
    return (
        <header className="app-header flex justify-space-between full">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/board"> Boards </Link>
            </nav>
            <nav>app-logo</nav>
            <nav>
                {!props.loggedInUser && <Link to="/login"  className="tags"
        activeStyle={{ color: 'red' }}> Login</Link>}
                {props.loggedInUser && <Link to="/login" style={{ backgroundImage: `url(${props.loggedInUser.imgUrl})` }}> </Link>}
            </nav>
        </header>
    )
}