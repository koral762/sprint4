
import { Link } from 'react-router-dom'

export function Home() {
    return (
        <section className="home flex column align-center justify-center full">
            <h1>Yo!</h1>
            <Link to='/board' className="primary-btn">Try It Free</Link>
            <div className="body-bg">
            <div className="color1 color"></div>
            <div className="color2 color"></div>
            <div className="color3 color"></div>
            </div>
        </section>
    )
}