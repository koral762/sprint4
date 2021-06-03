import { httpService } from './http-service'
// var cloudinary = require('cloudinary').v2;
import { utils } from './utils-service'

export const boardService = {
    getBoardById,
    updateBoard,
    createActivity,
    getCardTitleById
}

var gBoards = require('./data/board.json')

function getBoardById(id) {
    return Promise.resolve(gBoards[0])
}

async function updateBoard(newBoard) {
    gBoards[0] = newBoard;
    return Promise.resolve(gBoards[0])
    // return await httpService.put(`board/${boardId}`, board)
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
        activity.group = {...partialActivity.group }
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