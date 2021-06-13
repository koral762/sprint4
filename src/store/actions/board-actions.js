import { boardService } from '../../services/board-service'
import { socketService } from '../../services/socket-service';
import { utils } from '../../services/utils-service'
const { cardService } = require("../../services/card-service");


export function loadBoard(id) {
    return async dispatch => {

        try {
            const board = await boardService.getBoardById(id);
            dispatch({ type: 'SET_BOARD', board })
            socketService.emit('join board', id) // join('u101')
            socketService.off('updated board')
            socketService.on('updated board', board => {
                dispatch({ type: 'SET_BOARD', board })
            })
            // socketService.on('task-updated', task => {
            //     dispatch({ type: 'saveTask', task })
            // })

        } catch (err) {
            console.log('boardStore: Error in loadBoard', err)
            throw err
        }
    }
}

export function loadBoards() {
    return async dispatch => {
        try {
            const boards = await boardService.query()
            dispatch({ type: 'SET_BOARDS', boards })
        } catch (err) {
            console.log('ReviewActions: err in loadBoard', err)
        }
    }
}

export function addNewBoard(boardName, boardColor = '#519839') {

    return async dispatch => {
        const board = await boardService.addNewBoard(boardName, boardColor)
        dispatch({ type: 'SET_BOARD', board });
        return board
    }
}

export function removeBoard(boardId) {
    return async dispatch => {
        try {
            await boardService.remove(boardId)
            dispatch({ type: 'REMOVE_REVIEW', boardId })
        } catch (err) {
            console.log('ReviewActions: err in removeBoard', err)
        }
    }
}

export function setStyle(style) {
    return async dispatch => {
        dispatch({ type: 'SET_STYLE', style })
    }
}

export function setDefaultStyle() {
    return async dispatch => {
        dispatch({ type: 'SET_DEFAULT_STYLE' })
    }
}

export function updateBoard(board) {
    return async dispatch => {
        try {
            let newBoard = JSON.parse(JSON.stringify(board))
            dispatch({ type: 'SET_BOARD', board: newBoard })
            await boardService.updateBoard(newBoard) // updating the DB
        } catch (err) {
            console.log('error updating board', err)
        }
    }
}

export function onRemoveGroup(board, groupId) {
    return async dispatch => {
        try {
            let newBoard = JSON.parse(JSON.stringify(board))
            const groupIdx = newBoard.groups.findIndex(group => groupId === group.id)
            newBoard.groups.splice(groupIdx, 1)
            dispatch({ type: 'SET_BOARD', board: newBoard })
            await boardService.updateBoard(newBoard) // updating the DB
        } catch (err) {
            console.log('error deleting card', err)
        }
    }
}

export function onAddNewGroup(board, groupTitle) {
    return async dispatch => {
        try {
            let newBoard = JSON.parse(JSON.stringify(board))
            const groupToPush = {
                id: utils.makeId(),
                title: groupTitle,
                cards: [],
                archivedAt: false,
                style: {}
            }
            newBoard.groups.push(groupToPush)
            dispatch({ type: 'SET_BOARD', board: newBoard })
            await boardService.updateBoard(newBoard)
        } catch (err) {
            console.log('error adding new group', err)
        }
    }
}

export function addCard(board, cardTxt, groupId) {
    return async dispatch => {
        try {
            const newBoard = await cardService.addCard(board, cardTxt, groupId)
            dispatch({ type: 'SET_BOARD', board: newBoard });
            boardService.updateBoard(newBoard)
        } catch (err) {
            console.log('ReviewActions: err in addCard', err);
        }
    };
}

export function updateCard(board, newCard, activity) {
    return async dispatch => {
        try {
            // replicate board
            let newBoard = JSON.parse(JSON.stringify(board))
            // find the group idx
            const groupIdx = newBoard.groups.findIndex(group => group.cards.find(card => card.id === newCard.id))
            // find the card idx
            const cardIdx = newBoard.groups[groupIdx].cards.findIndex(card => card.id === newCard.id)
            // replace the card content
            newBoard.groups[groupIdx].cards[cardIdx] = newCard

            if (activity) {
                if (!newBoard.activities) {
                    newBoard.activities = []
                }
                newBoard.activities.unshift(activity)
            }

            dispatch({ type: 'SET_BOARD', board: newBoard })
            await boardService.updateBoard(newBoard) // updating the DB

        } catch (err) {
            console.log('error updating card', err)
        }
    }
}

export function onRemoveCard(board, cardId) {
    return async dispatch => {
        try {
            let newBoard = JSON.parse(JSON.stringify(board))
            const groupIdx = newBoard.groups.findIndex(group => group.cards.find(card => card.id === cardId))
            const cardIdx = newBoard.groups[groupIdx].cards.findIndex(card => card.id === cardId)
            newBoard.groups[groupIdx].cards.splice(cardIdx, 1)
            dispatch({ type: 'SET_BOARD', board: newBoard })
            await boardService.updateBoard(newBoard) // updating the DB
        } catch (err) {
            console.log('error deleting card', err)
        }
    }
}

export function setNewGroupName(groupId, groupName, board) {
    return async dispatch => {
        try {
            const groupIdx = board.groups.findIndex(group => group.id === groupId)
            if (groupName === board.groups[groupIdx].title || !groupName.trim()) return
            let newBoard = JSON.parse(JSON.stringify(board))
            const newGroupName = groupName.replace(/\s+/g, " ")
            newBoard.groups[groupIdx].title = newGroupName.trim()
            dispatch({
                type: 'SET_BOARD',
                board: newBoard
            })
            await boardService.updateBoard(newBoard)
        } catch (err) {
            console.log('error setting group name', err)
        }
    }
}

export function addActivity(board, activity) {
    return async dispatch => {
        try {
            let newBoard = JSON.parse(JSON.stringify(board))
            if (!newBoard.activities) newBoard.activities = []
            newBoard.activities.unshift(activity)
            dispatch({ type: 'SET_BOARD', board: newBoard })
            await boardService.updateBoard(newBoard) // updating the DB
            console.log(newBoard)
        } catch (err) {
            console.log('error updating board', err)
        }
    }
}

export function toggleFullLabels() {
    return dispatch => {
        dispatch({ type: 'TOGGLE_FULL_LABEL' })
    }
}

export function addLabel(board, newLabel) {
    return async dispatch => {
        try {
            let newBoard = JSON.parse(JSON.stringify(board))
            newLabel.id = utils.makeId()
            if (!newBoard.labels) newBoard.labels = [];
            newBoard.labels.push(newLabel)
            dispatch({ type: 'SET_BOARD', board: newBoard })
            await boardService.updateBoard(newBoard) // updating the DB
        } catch (err) {
            console.log('error adding label', err)
        }
    }
}

export function removeLabel(board, labelId) {
    return async dispatch => {
        try {
            let newBoard = JSON.parse(JSON.stringify(board))
            const labelIdx = newBoard.labels.findIndex(label => label.id === labelId)
            newBoard.labels.splice(labelIdx, 1)
            dispatch({ type: 'SET_BOARD', board: newBoard })
            await boardService.updateBoard(newBoard) // updating the DB
        } catch (err) {
            console.log('error removing label', err)
        }
    }
}

export function updateLabel(board, updatedlabel) {
    return async dispatch => {
        try {
            let newBoard = JSON.parse(JSON.stringify(board))
            newBoard.labels = newBoard.labels.map(label => {
                if (label.id === updatedlabel.id) label = updatedlabel
                return label
            })
            dispatch({ type: 'SET_BOARD', board: newBoard })
            await boardService.updateBoard(newBoard) // updating the DB
        } catch (err) {
            console.log('error updating label', err)
        }
    }
}

export function removeCardMember(board, card, id) {
    return async dispatch => {
        const newCard = JSON.parse(JSON.stringify(card))

        if (!newCard.members) newCard.members = []

        newCard.members = newCard.members.filter(user => user._id !== id)

        // replicate board
        let newBoard = JSON.parse(JSON.stringify(board))
        // find the group idx
        const groupIdx = newBoard.groups.findIndex(group => group.cards.find(card => card.id === newCard.id))
        // find the card idx
        const cardIdx = newBoard.groups[groupIdx].cards.findIndex(card => card.id === newCard.id)
        // replace the card content

        newBoard.groups[groupIdx].cards[cardIdx] = newCard

        dispatch({ type: 'SET_BOARD', board: newBoard })

        await boardService.updateBoard(newBoard) // updating the DB
    }
}

export function addCardMember(board, card, { _id, fullName, imgUrl }) {
    return async dispatch => {
        const userToPush = {
            _id,
            fullName,
            imgUrl
        }

        const newCard = JSON.parse(JSON.stringify(card))

        if (!newCard.members) newCard.members = []

        newCard.members.push(userToPush)

        // replicate board
        let newBoard = JSON.parse(JSON.stringify(board))
        // find the group idx
        const groupIdx = newBoard.groups.findIndex(group => group.cards.find(card => card.id === newCard.id))
        // find the card idx
        const cardIdx = newBoard.groups[groupIdx].cards.findIndex(card => card.id === newCard.id)
        // replace the card content

        newBoard.groups[groupIdx].cards[cardIdx] = newCard

        dispatch({ type: 'SET_BOARD', board: newBoard })

        await boardService.updateBoard(newBoard) // updating the DB
    }
}

export function addToMembers({ _id, fullName, imgUrl }, board) {
    return async dispatch => {
        const userToPush = {
            _id,
            fullName,
            imgUrl
        }
        let newBoard = JSON.parse(JSON.stringify(board))
        newBoard.members.unshift(userToPush)
        dispatch({ type: 'SET_BOARD', board: newBoard })
        await boardService.updateBoard(newBoard) // updating the DB
    }
}

export function removeMember(id, board) {
    return async dispatch => {
        let newBoard = JSON.parse(JSON.stringify(board))
        const memberIdx = newBoard.members.findIndex(member => member._id === id)
        newBoard.members.splice(memberIdx, 1)
        dispatch({ type: 'SET_BOARD', board: newBoard })
        await boardService.updateBoard(newBoard) // updating the DB
    }
}

export function resetFilterBy(boardId) {
    return async dispatch => {
        const board = await boardService.getBoardById(boardId);
        dispatch({ type: 'SET_BOARD', board });
        dispatch({ type: 'RESET_FILTER_BY' })
    }
}

export function updatePosition(newBoardPositioning, cardId) {
    return async dispatch => {
        try {
            dispatch({ type: 'SET_BOARD', board: newBoardPositioning })
            let newBoard = JSON.parse(JSON.stringify(newBoardPositioning))
            await boardService.updateBoard(newBoard) // updating the DB

        } catch (err) {
            console.log('error updating board', err)
        }
    }
}

export function updateBoardTitle(board, boardTitle) {
    return async dispatch => {
        let newBoard = JSON.parse(JSON.stringify(board))
        newBoard.title = boardTitle
        dispatch({ type: 'SET_BOARD', board: newBoard })
        await boardService.updateBoard(newBoard) // updating the DB
    }
}

// /////////////////////////////////////////////////
// function makeId(length = 8) {
//     let text = '';
//     const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for (let i = 0; i < length; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }

//     return text;
// }