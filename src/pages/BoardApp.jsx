import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GroupList } from '../cmps/groups/GroupList'
import { CardDetails } from '../cmps/cards/CardDetails'
import { BoardNav } from '../cmps/BoardNav'
import { loadBoard, onRemoveGroup } from '../store/actions/board-actions'
// import { Link } from "react-router-dom";

export class _BoardApp extends Component {
    state = {
        lastReceivedUpdateAt: ''
    }

    async componentDidMount() {
        const { boardId } = this.props.match.params
        await this.props.loadBoard(boardId)
    }

    onAddGroup = (txt) => {
        return txt
    }

    onToggleSidebar = () => {

    }

    render() {
        const { board } = this.props
        console.log('currBoard', board);
        return (
            <React.Fragment>

                <div className="board-app board-container flex column">
                    {(this.props.match.params.cardId) ?
                        <CardDetails cardId={this.props.match.params.cardId} boardId={this.props.board._id} history={this.props.history} /> : <div></div>}

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
    onRemoveGroup
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)