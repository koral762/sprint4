import React, { Component } from 'react'
import { connect } from 'react-redux';
import { MemberList } from '../cmps/BoardHeader/MemberList';
// import { Filter } from './Filter';
import { loadAllUsers } from '../store/actions/user-actions.js';
import { updateBoardTitle } from '../store/actions/board-actions.js';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
// import { Notifications } from './Notifications';
// import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import { BoardTitle } from '../cmps/BoardHeader/BoardTitle'
export class _BoardNav extends Component {
    async componentDidMount() {
        // await this.props.loadAllUsers()
    }

    onUpdateBoardTitle = (title) => {
        this.props.updateBoardTitle(this.props.board, title)
    }

    render() {
        return (
            <div className="board-header-container flex justify-space-between wrap" >
                <div className="board-nav-left flex align-center">
                    <BoardTitle titleTxt={this.props.board.title} onUpdate={this.onUpdateBoardTitle}></BoardTitle>
                    <div className="members-container">
                        <MemberList members={this.props.members} allUsers={this.props.allUsers}/>
                    </div>

                    <div className="btn"><span className="material-icons">
                        person_add</span>Invite</div>
                   
                </div>
                <div className="board-nav-right flex ">
                    <button className="notification-icon flex">
                    <NotificationsNoneIcon />
                    </button>
                    <button onClick={() => this.props.onToggleSidebar(true)}>
                        <span className="material-icons">more_horiz</span>Show menu
                </button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
        allUsers: state.userModule.users
    };
};
const mapDispatchToProps = {
    loadAllUsers,
    updateBoardTitle
};

export const BoardNav = connect(mapStateToProps, mapDispatchToProps)(_BoardNav);