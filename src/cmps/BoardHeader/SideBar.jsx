import React, { Component } from 'react'
import { connect } from 'react-redux';


export class _SideBar extends Component {

    state = {

    }

    async componentDidMount() {
        // await this.props.loadAllUsers()
    }

    render() {
        return (
            <div className="side-bar-container" >
                {console.log('side bar innn')}
                <div className="side-bar-header">
                    <span className="menu-title"></span>
                    <button className="close-side-bar" onClick={()=>{this.props.onToggleSidebar(false)}}></button>
                </div>
                <hr></hr>
                <div className="side-bar-selection">
                <a href="#">About this board</a>
                <a href="#">Change background</a>
                <a href="#">Board analysis</a>
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

};
export const SideBar = connect(mapStateToProps, mapDispatchToProps)(_SideBar);