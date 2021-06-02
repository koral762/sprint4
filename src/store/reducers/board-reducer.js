const initialState = {
    currBoard: {},
    fullLabel: false

}

export function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOARD':
            return { ...state, currBoard: action.board }
        case 'TOGGLE_FULL_LABEL':
            if (state.fullLabel) return { ...state, fullLabel: false }
            return { ...state, fullLabel: true }
        default:
            return state
    }
}
