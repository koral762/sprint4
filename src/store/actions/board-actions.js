import { boardService } from '../../services/board-service'
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

export function onRemoveGroup(board, groupid) {

  return async dispatch => {
    try {
      let newBoard = JSON.parse(JSON.stringify(board))
      const groupIdx = newBoard.groups.findIndex(group => groupid === group.id)
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
      await boardService.updateBoard(newBoard)
    } catch (err) {
      console.log('error removing board', err)
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
      newLabel.id = makeId()
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

// ////////////////////////////////////////////////
function makeId(length = 8) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

