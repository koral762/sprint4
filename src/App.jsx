import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from './routes'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import { AppHeader } from './cmps/AppHeader'
import { onLogout } from './store/actions/user-actions.js'
import { boardService } from './services/board-service.js'
import { updatePosition, resetFilterBy, addActivity } from './store/actions/board-actions.js';

// import { boardService } from './store/boardService.js'
// import { createMuiTheme, ThemeProvider, } from '@material-ui/core'

class _App extends Component {

  onDragStart = () => {
    this.props.resetFilterBy(this.props.board._id)
  }

  onDragEnd = (result) => {

    const { destination, source, draggableId, type } = result

    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return
    if (!draggableId) return

    if (type === 'card') {
      const startGroupIndex = this.props.board.groups.findIndex(group => group.id === source.droppableId)
      const endGroupIndex = this.props.board.groups.findIndex(group => group.id === destination.droppableId)

      // moving in the same group
      if (source.droppableId === destination.droppableId) {

        const currGroup = this.props.board.groups.find(group => group.id === source.droppableId)
        const currCard = currGroup.cards.find(card => card.id === draggableId)
        const newCardsGroup = Array.from(currGroup.cards)
        newCardsGroup.splice(source.index, 1)
        newCardsGroup.splice(destination.index, 0, currCard)
        const newGroup = { ...currGroup, cards: newCardsGroup }
        const newGroups = [...this.props.board.groups]
        newGroups[startGroupIndex] = newGroup
        const newBoard = { ...this.props.board, groups: newGroups }
        this.props.updatePosition(newBoard)
        return
      }

      // moving between groups
      if (source.droppableId !== destination.droppableId) {
        const destinationGroup = this.props.board.groups.find(group => group.id === destination.droppableId)
        const formerGroup = this.props.board.groups.find(group => group.id === source.droppableId)
        const newGroup = this.props.board.groups.find(group => group.id === destination.droppableId)
        // try to find card in old group
        let currCard = formerGroup.cards.find(card => card.id === draggableId)
        // find card in new group (for some reason it is there after merge, probably groups update before this function is called)
        if (!currCard) currCard = newGroup.cards.find(card => card.id === draggableId)
        const formerCardIndex = formerGroup.cards.findIndex(card => card.id === draggableId)
        const newCardsArray = Array.from(destinationGroup.cards)

        // time analysis
        const currCardTime = currCard.timeAnalysis

        if (currCardTime) {
          currCardTime.timeInGroupsMap[currCardTime.currGroup.groupId] =
            currCardTime.timeInGroupsMap[currCardTime.currGroup.groupId] + (Date.now() - currCardTime.currGroup.enteredAt) ||
            (Date.now() - currCardTime.currGroup.enteredAt)
          currCardTime.currGroup = {
            groupId: destinationGroup.id,
            enteredAt: Date.now()
          }
        }

        newCardsArray.splice(destination.index, 0, currCard)
        formerGroup.cards.splice(formerCardIndex, 1)

        const newGroups = [...this.props.board.groups]
        newGroups[startGroupIndex] = formerGroup
        newGroups[endGroupIndex].cards = newCardsArray

        const newBoard = { ...this.props.board, groups: newGroups }
        this.props.updatePosition(newBoard, draggableId)

        // add activity

        const cardTitle = boardService.getCardTitleById(draggableId, newBoard)
        const partialActivity = {
          "txt": 'moved the card',
          "commentTxt": '',
          "card": {
            "id": draggableId,
            "title": cardTitle
          }
        }

        const activity = boardService.createActivity(partialActivity)
        this.props.addActivity(newBoard, activity)
        return
      }
    }

    if (type === 'group') {
      const newGroupsOrder = Array.from(this.props.board.groups)
      const currGroup = this.props.board.groups.find(group => group.id === draggableId)
      newGroupsOrder.splice(source.index, 1)
      newGroupsOrder.splice(destination.index, 0, currGroup)

      const newBoard = {
        ...this.props.board,
        groups: newGroupsOrder
      }

      this.props.updatePosition(newBoard)
      // this.props.updateBoard(newBoard)
      return

    }
  }
  ///////////

  render() {
    const { onLogout, loggedinUser,style } = this.props
    return (
      // <ThemeProvider theme={theme}>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="app-bg"
          style={style.bgImg ? { backgroundImage: style.bgImg } :
            { backgroundColor: style.boardColor}}>

          <div className="main-container flex column full" >
            <AppHeader onLogout={onLogout} loggedinUser={loggedinUser} />
            <Switch className="content">
              {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
            </Switch>
          </div>
        </div>
      </DragDropContext>
      /* </ThemeProvider> */
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedinUser: state.userModule.loggedinUser,
    board: state.boardModule.currBoard,
    style: state.boardModule.style
    
  }
}

const mapDispatchToProps = {
  updatePosition,
  resetFilterBy,
  addActivity,
  onLogout
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)


