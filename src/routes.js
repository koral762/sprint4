import { Home } from './pages/Home.jsx'
import { BoardApp } from './pages/BoardApp.jsx'
import { Boards } from './pages/Boards.jsx'



export const routes = [

    {
        path: '/board/card/:cardId',
        component: BoardApp,
    },
    {
        path: '/board/:boardId',
        component: BoardApp,
    },
    {
        path: '/board',
        component: BoardApp,
    },
    {
        path: '/',
        component: Home,
    }
]