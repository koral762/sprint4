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
                <div className="boards-header-container flex " >
                    {/* <h3>{this.props.title}</h3> */}
                    Board Title Here
                    <div className="members-container">
                        {/* <MemberList members={this.props.members} allUsers={this.props.allUsers}/> */}
                        Member List Here
                    </div>
                    {/* <Filter onFilter={this.props.onFilter} /> */}
                    Filter here
                    {/* <Notifications board={this.props.board} lastUpdate={this.props.lastUpdate}/> */}
                    Notifications Here
                    <div className="board-header-btn show-menu" onClick={() => this.props.onToggleSidebar(true)}>
                        {/* <MoreHorizOutlinedIcon /> */}
                        <p>Activities Menu Here</p>
                    </div>
                </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        board: state.boardModule.board,
        allUsers: state.userModule.users
    };
};
const mapDispatchToProps = {
    // loadAllUsers
};
export const BoardNav = connect(mapStateToProps, mapDispatchToProps)(_BoardNav);