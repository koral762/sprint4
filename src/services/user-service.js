
import { storageService } from './storage-service'
import { httpService } from './http-service'

var gUsers = [
    {
        _id: '1',
        email: 'miri@gmail.com',
        username: 'miri',
        password: 'miri123',
        imgUrl: 'img.png'
    }
]

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    // getById,
    remove,
    update,
    // increaseScore
}


async function login(credentials) {
    try {
        //await httpService.post('auth/login', credentials)
        const user = gUsers.find(user => user.username === credentials.username)
        if (user) return _saveLocalUser(user)
    } catch (err) {
        throw err
    }
}

async function signup(userInfo) {
    try {
        const user = {}//await httpService.post('auth/signup', userInfo)
        return _saveLocalUser(user)
    } catch (err) {
        throw err
    }
}

async function logout() {
    try {
        sessionStorage.clear()
        return //await httpService.post('auth/logout')
    } catch (err) {
        throw err
    }
}

function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
}

async function getUsers() {
    return gUsers;
    return storageService.query('user')
    return httpService.get(`user`)
}

async function getById(userId) {
    return gUsers.find(user => user._id === userId)

    return storageService.get('user', userId)
    return httpService.get(`user/${userId}`)
}
async function remove(userId) {
    gUsers = gUsers.filter(user => user._id !== userId)

    return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    let userIndex = gUsers.indexOf(_user => _user._id !== user.id);
    gUsers.splice(userIndex, 1, user);

    return storageService.put('user', user)
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
}