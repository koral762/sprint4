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

function makeId(length = 8) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}