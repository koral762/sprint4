import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
// import { AddNewBoard } from './BoardHeader/AddNewBoard'
// import logoFutura from '../assets/icons/newLogoFutura.png'

import { connect } from 'react-redux'
// import { LoginDrawer } from './LoginDrawer'
import { onLogout } from '../store/actions/user-actions'
// import { MemberPreview } from './BoardHeader/MemberPreview'
// import { Dialog, IconButton } from '@material-ui/core'
// import { Users } from './Users/UsersMain'

import { userService } from '../services/user-service'
// import { CloseOutlined } from '@material-ui/icons'


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
                    <div className="header-icons flex">
                        <div><NavLink to='/'><span className="material-icons btn">
                            home</span></NavLink></div>
                        <div><NavLink to='/board'><span className="material-icons btn">
                        dashboard</span></NavLink></div>
                    </div>

                    <div className="logo">LOGO</div>

                    <div className="flex">
                        <div onClick={this.toggleModal}>Add</div>
                        <div>Login</div>
                    </div>
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
