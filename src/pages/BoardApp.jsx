import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GroupList } from '../cmps/groups/GroupList'
import { CardDetails } from '../cmps/cards/CardDetails'
import { BoardNav } from '../cmps/BoardNav'
import { loadBoard, onRemoveGroup } from '../store/actions/board-actions'
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
            <div className="board-app">
            {/* { this.props.cardId &&  */}
                {<CardDetails boardId={"5f72ea5a1ab1fc0017450368"} cardId={"9LCF8f9WKY"}/> }
                <section className="board-container flex column">
                    <BoardNav />
                    <GroupList groups={this.props.board.groups} onAddGroup={this.onAddGroup}/> 
                </section>
            </div>
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