import {boardService} from '../../services/board-service'
const { cardService } = require("../../services/card-service");


export function loadBoard() {
    return async dispatch => {
        try {
            const board = await boardService.getBoardById()
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('ReviewActions: err in loadBoard', err)
        }
    }
}
export function onRemoveGroup() {

}

export function onAddNewGroup(board, groupTitle) {
    return async dispatch => {
      try {
        let newBoard = JSON.parse(JSON.stringify(board))
        const groupToPush = {
          id: makeId(),
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


export function updateCard(board, newCard) {

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


// ////////////////////////////////////////////////
function makeId(length = 8) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}