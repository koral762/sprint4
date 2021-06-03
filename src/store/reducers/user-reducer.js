import { userService } from '../../services/user-service.js'


const initialState = {
    loggedinUser: userService.getLoggedinUser(),
    users: [{
        "_id": "5f6a2528973d861c5d78c355",
        "fullName": "Koral Sabbah",
        "imgUrl": "https://res.cloudinary.com/dyslqd6pn/image/upload/v1601365356/tx2jp0nl1ruofyhbdrnv.webp"
      },
      {
        "_id": "5f6a2528973d861c5d78c328",
        "fullName": "Ksenia Braginsky",
        "imgUrl": "https://res.cloudinary.com/dyslqd6pn/image/upload/v1601365537/rnymwcd6hepeuvw6domo.jpg"
      },
      {
        "_id": "5f6a2528973d861c5d78c322",
        "fullName": "Miriam Baranovska",
        "imgUrl": "http://some-img"
      },
      {
        "_id": "5f6a2528973d861c5d78c323",
        "fullName": "Avi Kohen",
        "imgUrl": "../../imgs/miriam.jpg"
      }
    ]
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