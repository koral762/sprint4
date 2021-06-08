import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
// import { AddNewBoard } from './BoardHeader/AddNewBoard'
// import logoFutura from '../assets/icons/newLogoFutura.png'
import DashboardIcon from '@material-ui/icons/Dashboard';
import { connect } from 'react-redux'
// import { LoginDrawer } from './LoginDrawer'
import { onLogout } from '../store/actions/user-actions'
// import { MemberPreview } from './BoardHeader/MemberPreview'
// import { Dialog, IconButton } from '@material-ui/core'
// import { Users } from './Users/UsersMain'

import { userService } from '../services/user-service'
// import { CloseOutlined } from '@material-ui/icons'
// import Logo from '../assets/imgs/light-trello.jpeg'
import Logo from '../assets/imgs/logo.png'


export class _AppHeader extends Component {

    state = {
        isNewBoardModalShown: false,
        isLoginDrawerShown: false,
        isUserDetailsOpen: false,
        loggedinUser: null
    }

    toggleModal = () => {
        this.setState({ isNewBoardModalShown: !this.state.isNewBoardModalShown })
    }

    onCloseModal = () => {
        this.setState({ isNewBoardModalShown: false })
    }

    componentDidMount() {
        this.setState({ loggedinUser: userService.getLoggedinUser() })
    }

    redirectPath = (id) => {
        this.props.history.replace(`/`)
        this.props.history.replace(`/board/${id}`)
        this.onCloseModal()
    }

    showLoginDrawer = (ev) => {
        ev.stopPropagation()
        ev.nativeEvent.stopImmediatePropagation();
        this.setState({ isLoginDrawerShown: true })
    }

    hideLoginDrawer = (ev) => {
        if (ev) ev.stopPropagation()
        this.setState({ isLoginDrawerShown: false })
    }

    onOpenUserDetails = () => {
        console.log('open')
        this.setState({ isUserDetailsOpen: true })
    }

    onCloseUserDetails = () => {
        this.setState({ isUserDetailsOpen: false })
    }

    onLogout = async (ev) => {
        ev.stopPropagation()
        await this.props.logout()
        this.setState({ isUserDetailsOpen: false })
    }

    render() {
        return (
            <React.Fragment>

                <div className="flex justify-space-between app-header align-center">

                    <div className="right-side flex">
                    <div className="header-icons flex">
                        <div>
                        <NavLink to='/'>
                        <span className="material-icons btn">
                            home</span>
                            </NavLink>
                            </div>
                        <div>
                        <NavLink to='/board'>
                        <button className="flex align-center btn">
                            <DashboardIcon/> 
                          <span className="boards-btn">Boards</span>
                            </button>
                            </NavLink>
                            </div>
                    </div>
                     <input className="btn board-nav-filter" type="text" placeholder="Search..."></input>
                    </div>

                    <img src={Logo} className="logo-img"/>

                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        // loggedinUser: state.userReducer.loggedinUser
    }
}

const mapDispatchToProps = {
    onLogout
}

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader);
