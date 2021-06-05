import { httpService } from './http-service'
import { socketService } from './socket-service'
// var cloudinary = require('cloudinary').v2;
import { utils } from './utils-service'

export const boardService = {
    getBoardById,
    updateBoard,
    createActivity,
    getCardTitleById,
    query,
    createImage
}

async function getBoardById(id) {
    return await httpService.get(`board/${id}`)
}

async function query() {
    return await httpService.get(`board`)
}

async function updateBoard(newBoard) {
    socketService.emit('updated board', newBoard) 
    return await httpService.put(`board/${newBoard._id}`, newBoard)
}

function createActivity(partialActivity) {
    // const user = userService.getLoggedInUser()

    const activity = {
        "id": utils.makeId(),
        "txt": partialActivity.txt,
        "commentTxt": partialActivity.commentTxt,
        "createdAt": Date.now(),
        "byMember": {
            // "_id": user._id,
            // "fullName": user.fullName,
            // "imgUrl": user.imgUrl
        }
    }
    if (partialActivity.card) {
        activity.card = {
            "id": partialActivity.card.id,
            "title": partialActivity.card.title
        }
    }
    if (!partialActivity.group) {
        activity.group = { ...partialActivity.group }
    }

    return activity
}

function getCardTitleById(cardId, board) {
    let cardTitle;
    board.groups.forEach(group => group.cards.forEach(card => {
        if (card.id === cardId) {
            cardTitle = card.title
        }
    }))
    return cardTitle
}

function createImage(imgRef) {
    const attachment = {
        type: 'img',
        id: utils.makeId(),
        src: imgRef,
        title: 'Image',
        createdAt: Date.now()
    }
    return attachment
}