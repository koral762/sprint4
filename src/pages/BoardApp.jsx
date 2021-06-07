import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GroupList } from '../cmps/groups/GroupList'
import { CardDetails } from '../cmps/cards/CardDetails'
import { BoardNav } from '../cmps/BoardNav'
import { loadBoard, onRemoveGroup, setStyle, updateBoard } from '../store/actions/board-actions'
import { loadAllUsers } from '../store/actions/user-actions.js'
// import { Link } from "react-router-dom";

import { socketService } from '../services/socket-service.js';
import { SideBar } from '../cmps/BoardHeader/SideBar/SideBar'

export class _BoardApp extends Component {
    state = {
        lastReceivedUpdateAt: '',
        isSidebarShowing: false
    }
    
    async componentDidMount() {
        const { boardId } = this.props.match.params;
        socketService.setup()
        await this.props.loadBoard(boardId)
        this.props.setStyle(this.props.board.style)
        this.props.loadAllUsers()
    }
    
    async componentDidUpdate() {
      
        
        
    }

    onAddGroup = (txt) => {
        return txt
    }

    onToggleSidebar = (isSidebarShowing) => {
        this.setState({ isSidebarShowing });
    }

    render() {
        const { board } = this.props
        return (
            <React.Fragment>

                <div className="board-app board-container flex column">
                    {(this.props.match.params.cardId) ?
                        <CardDetails cardId={this.props.match.params.cardId} boardId={this.props.match.params.boardId} history={this.props.history} /> : <div></div>}

                    <BoardNav title={board.title}
                        members={board.members}
                        onToggleSidebar={this.onToggleSidebar}
                        // onFilter={this.onFilter}
                        style={board.style}
                        users={this.props.allUsers}
                        lastUpdate={this.state.lastReceivedUpdateAt}
                    />
                    {this.state.isSidebarShowing && <SideBar onToggleSidebar={this.onToggleSidebar}/>}
                    <GroupList groups={this.props.board.groups} onAddGroup={this.onAddGroup} history={this.props.history} style={board.style} />
                </div>
            </React.Fragment>

        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.currBoard
        // loggedInUser: state.appModule.loggedInUser
    }
}

const mapDispatchToProps = {
    loadBoard,
    onRemoveGroup,
    updateBoard,
    loadAllUsers,
    setStyle 
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)