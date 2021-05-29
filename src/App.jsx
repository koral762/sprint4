import { Route, Switch } from 'react-router-dom'
import { routes } from './routes'
import { connect } from 'react-redux'
import { AppHeader } from './cmps/AppHeader'
import React, { Component } from 'react';
import { onLogout } from './store/actions/user-actions.js'
// import { createMuiTheme, ThemeProvider, } from '@material-ui/core'

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#a9d6e5',
//     },
//     secondary: {
//       main: '#ffff',
//     }

//   }

// })

class _App extends Component {
  render() {
    const { onLogout, loggedinUser } = this.props
    return (
      // <ThemeProvider theme={theme}>
      <div className="main-container flex column full" >
        <AppHeader onLogout={onLogout} loggedinUser={loggedinUser} />
        <Switch className="content">
          {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
        </Switch>
      </div>
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


