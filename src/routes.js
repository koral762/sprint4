import { Home } from './pages/Home.jsx'
import { BoardApp } from './pages/BoardApp.jsx'
import { Boards } from './pages/Boards.jsx'



export const routes = [
    {
        path: '/board/:boardId/card/:cardId',
        component: BoardApp,
    },
    {
        path: '/board/:boardId',
        component: BoardApp,
    },
    {
        path: '/board',
        component: Boards,
    },
    {
        path: '/',
        component: Home,
    }
]