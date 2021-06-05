import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GroupList } from '../cmps/groups/GroupList'
import { CardDetails } from '../cmps/cards/CardDetails'
import { BoardNav } from '../cmps/BoardNav'
import { loadBoard, onRemoveGroup, updateBoard } from '../store/actions/board-actions'
import { loadAllUsers } from '../store/actions/user-actions.js'
// import { Link } from "react-router-dom";
import { socketService } from '../services/socket-service.js';

export class _BoardApp extends Component {
    state = {
        lastReceivedUpdateAt: ''
    }


    async componentDidMount() {
        const { boardId } = this.props.match.params;
        await this.props.loadBoard(boardId)
    }

    async componentDidUpdate() {
        const { boardId } = this.props.match.params;

        await this.props.loadBoard(boardId)
        this.props.loadAllUsers()
        socketService.setup()

        socketService.emit('join board', boardId)
        socketService.on('updated board', () => {
            this.props.updateBoard(this.props.board)
        })
    }

    onAddGroup = (txt) => {
        return txt
    }

    onToggleSidebar = () => {

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
                        // onToggleSidebar={this.onToggleSidebar}
                        // onFilter={this.onFilter}
                        style={board.style}
                        users={this.props.allUsers}
                        lastUpdate={this.state.lastReceivedUpdateAt}
                    />
                    <GroupList groups={this.props.board.groups} onAddGroup={this.onAddGroup} history={this.props.history} />
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
    loadAllUsers
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)