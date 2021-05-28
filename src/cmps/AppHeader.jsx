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
                {/* <Dialog open={this.state.isUserDetailsOpen} onClose={this.onCloseUserDetails} onBackdropClick={this.onCloseUserDetails}> */}
                {/* <div className="user-details-preview-header">
                        <div>User Details</div>
                        <button onClick={this.onCloseUserDetails}>
                            <CloseOutlined />
                        </button>
                    </div> */}
                {/* <Users onCloseUserDetails={this.onCloseUserDetails} onLogout={this.onLogout}/> */}
                {/* </Dialog> */}
                {/* <Dialog open={this.state.isNewBoardModalShown} onClose={this.onCloseModal} onBackdropClick={this.onCloseModal}> */}
                {/* <div>Add new board</div> */}
                {/* <AddNewBoard onCloseModal={this.onCloseModal} redirectPath={this.redirectPath} /> */}
                {/* </Dialog> */}
                <div className="navbar-container app-header flex justify-space-between full">
                    <div className="navbar-left-container flex">
                        <div className="board-header-btn">
                            <NavLink to='/' activeClassName="header-nav-link">
                                <span className="material-icons">Home</span>
                                </NavLink></div>
                        <div className="board-header-btn">
                            <NavLink to='/board' activeClassName="header-nav-link">
                            <span className="material-icons">Boards</span></NavLink></div>
                    </div>

                    {/* <div className="header-logo"><img src={logoFutura} alt="best logo ever" /></div> */}
                    <div className="logo">LOGO</div>

                    <div className="navbar-right-container flex">
                        <div className="board-header-btn right header-nav-link" onClick={this.toggleModal}><span className="material-icons">add</span></div>

                        {(!this.props.loggedinUser) ? 
                        <div className="board-header-btn login right header-nav-link" onClick={this.showLoginDrawer}>Login</div> : ''}
                        {/* {(this.props.loggedinUser) ? <div onClick={this.onOpenUserDetails} className="member-preview-header-container"><MemberPreview name={this.props.loggedinUser.fullName} imgUrl={this.props.loggedinUser.imgUrl} /></div> : <React.Fragment />} */}
                        {/* 
                        <LoginDrawer isShowing={this.state.isLoginDrawerShown} hideLoginDrawer={this.hideLoginDrawer} /> */}
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
