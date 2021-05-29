import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GroupList } from '../cmps/groups/GroupList'
import { BoardNav } from '../cmps/BoardNav'
import { loadBoard , onRemoveGroup } from '../store/actions/board-actions'
// import { Link } from "react-router-dom";

export class _BoardApp extends Component {

    componentDidMount() {
        this.props.loadBoard()
    }

    onAddGroup = (txt) => {
        return txt
      }

    render() {
        return (
            <section className="board-container flex column">
                <BoardNav className="board-nav"/>
                <GroupList groups={this.props.board.groups} onAddGroup={this.onAddGroup} /> 
            </section>
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
