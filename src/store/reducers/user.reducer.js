import { userService } from '../../services/user.service.js'


const initialState = {
    loggedinUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, loggedinUser: action.user }
        case 'SIGN_UP':
            return { ...state, loggedinUser: action.user }
        case 'LOGOUT_USER':
            console.log(action.user);
            return { ...state, loggedinUser: action.user }
        default:
            return state
    }
}