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
                <div className="flex" >
                    <h3>{this.props.board.title}</h3>
                    <div>Member List Here</div>
                    <input type="text" placeholder="Filter here"></input>
                    <p>Notifications Here</p>
                    <div onClick={() => this.props.onToggleSidebar(true)}>
                        Activities Menu Here
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