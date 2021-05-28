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
                <div className="flex justify-space-between" >
                    <div>Board Title Here</div>
                    <div>
                        Member List Here
                    </div>

                    <div>Filter here</div>
                    
                    <div>Notifications Here</div>
                    <div onClick={() => this.props.onToggleSidebar(true)}>
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
