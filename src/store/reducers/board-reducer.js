const initialState = {
    currBoard: {},
    boards: [],
    style: {},
    fullLabel: false

}

const defaultStyle = {
    backgroundImage: null
}

export function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOARD':
            return { ...state, currBoard: action.board }
        case 'SET_BOARDS':
            return { ...state, boards: action.boards }
        case 'REMOVE_BOARD':
            return { ...state, currBoard: state.currBoard.filter(currBoard => currBoard._id !== action.currBoardId) }
        case 'SET_DEFAULT_STYLE':
            return {...state,style: defaultStyle}
        case 'SET_STYLE':
            return { ...state, style: action.style }
        case 'TOGGLE_FULL_LABEL':
            if (state.fullLabel) return { ...state, fullLabel: false }
            return { ...state, fullLabel: true }
        default:
            return state
    }
}
