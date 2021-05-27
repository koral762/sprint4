import {boardService} from '../../services/board-service'

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