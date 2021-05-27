import { Home } from './pages/Home.jsx'
import { BoardApp } from './pages/BoardApp.jsx'


export const routes = [

    {
        path: '/board',
        component: BoardApp,
    },
    {
        path: '/',
        component: Home,
    }
]