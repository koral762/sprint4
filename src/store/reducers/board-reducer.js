const initialState = {
    currBoard: {}
}

export function toyReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOARD':
            return { ...state, currBoard: action.board }
       default:
            return state
    }
}
