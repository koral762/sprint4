
import { Link } from 'react-router-dom'

export function Home() {
    return (
        <section className="home flex column align-center justify-center">
            <h1>Yo!</h1>
            <Link to='/board' className="primary-btn">Try It Free</Link>
            <div className="body-bg">
            <div class="color1 color"></div>
            <div class="color2 color"></div>
            <div class="color3 color"></div>
            </div>
        </section>
    )
}