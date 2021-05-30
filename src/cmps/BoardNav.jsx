import React, { Component } from 'react'
import { connect } from 'react-redux';
// import { MemberList } from './MemberList';
// import { Filter } from './Filter';
// import { loadAllUsers } from '../store/actions/user-actions';
// import { Notifications } from './Notifications';
// import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
export class _BoardNav extends Component {
    async componentDidMount() {
        // await this.props.loadAllUsers()
    }
    render() {
        return (
            <div className="boards-header-container flex justify-space-between" >
                <div className="board-nav-left flex">
                    <h2 className="proj-title">{this.props.board.title}</h2>
                    <div className="btn">Member List</div>
                    <div className="btn"><span className="material-icons">
                        person_add</span>Invite</div>
                    <input className="btn" type="text" placeholder="Filter here"></input>
                </div>
                <div className="show-menu">
                <button>notifications</button>
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
    // loadAllUsers
};
export const BoardNav = connect(mapStateToProps, mapDispatchToProps)(_BoardNav);