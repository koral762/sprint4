import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from './routes'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import { AppHeader } from './cmps/AppHeader'
import { onLogout } from './store/actions/user-actions.js'
import { boardService } from './services/board-service.js'
// import { createMuiTheme, ThemeProvider, } from '@material-ui/core'



class _App extends Component {

  onDragStart = () => {
    this.props.resetFilterBy(this.props.board._id)
  }

  onDragEnd = (result) => {}

  render() {
    const { onLogout, loggedinUser } = this.props
    return (
      // <ThemeProvider theme={theme}>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="main-container flex column full" >
          <AppHeader onLogout={onLogout} loggedinUser={loggedinUser} />
          <Switch className="content">
            {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
          </Switch>
        </div>
      </DragDropContext>
      /* </ThemeProvider> */
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedinUser: state.userModule.loggedinUser
  }
}

const mapDispatchToProps = {
  onLogout
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)


