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