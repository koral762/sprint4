
import { Link } from 'react-router-dom'

export function Home() {
    return (
        <section className="home flex column align-center justify-center full">
            <h1>Yo!</h1>
            <Link to='/board' className="primary-btn">Go to store</Link>
        </section>
    )
}