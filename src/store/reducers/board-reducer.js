const initialState = {
    currBoard: {}
}

export function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOARD':
            return { ...state, currBoard: action.board }
        case 'REMOVE_BOARD':
            return { ...state, currBoard: state.currBoard.filter(currBoard => currBoard._id !== action.currBoardId) }
        default:
            return state
    }
}
