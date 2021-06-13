import { httpService } from './http-service'
import { socketService } from './socket-service'
// var cloudinary = require('cloudinary').v2;
import { utils } from './utils-service'

export const boardService = {
    getBoardById,
    addNewBoard,
    updateBoard,
    createActivity,
    getCardTitleById,
    query,
    createImage,
    add
}


async function add(board) {
    const addedBoard = await httpService.post(`board`, board);
    return addedBoard
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

async function addNewBoard(boardName, boardColor) {
    const board = {
        title: boardName,
        isArchived: false,
        createdAt: Date.now,
        description: 'Board\'s description',
        labels: [{
            "id": "l101",
            "name": "Default",
            "color": "green"
        },
        {
            "id": "l102",
            "name": "Default",
            "color": "yellow"
        },
        {
            "id": "l103",
            "name": "Default",
            "color": "orange"
        },
        {
            "id": "l104",
            "name": "Default",
            "color": "red"
        },
        {
            "id": "l105",
            "name": "Default",
            "color": "purple"
        },
        {
            "id": "l106",
            "name": "Default",
            "color": "blue"
        }
        ],
        activities: [],
        createdBy: { // update from currUser
            _id: 'u2345', // update from user
            fullName: 'Gust',
            imgUrl: 'http://some-img'
        },
        style: {
            // id: utils.makeId(),
            fontClr: '#f9f9f9',
            bgImg: null,
            boardColor
        },
        members: [],
        groups: [{
            id: utils.makeId(),
            title: 'Add New Card Title',
            description: "description",
            archivedAt: false,
            labels: [],
            cards: []
        }]
    }
    const addedBoard = await httpService.post(`board`, board);
    return addedBoard
    // push new board to board collection and forword user to the new route
}