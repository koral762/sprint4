import React, { Component } from 'react'
import { connect } from 'react-redux';
import {onRemoveGroup} from '../../store/actions/board-actions.js'

export class _GroupMenu extends Component {

    addCard = (ev) => {
        // currently adding without moving to focus to new card
        // need to focus on "NewItem" and set its state with the help of parent element (same parent)
        ev.stopPropagation()
        this.props.onAdd('New Card')
    }

    removeGroup=(ev)=>{
        ev.stopPropagation()
        this.props.onRemoveGroup(this.props.board,this.props.groupId)
        this.props.toggleMenu()
    }

    render() {
        return (
            <section onClickAway={() => this.props.toggleMenu()}>
                <div className="group-menu-container">
                    <div>List Actions</div>
                    <div><hr /></div>
                    <div onClick={this.addCard} style={{ cursor: 'pointer' }} className="group-menu-item">Add Card...</div>
                    <div className="group-menu-item" style={{ cursor: 'pointer' }}>Delete All Cards...</div>
                    <div><hr /></div>
                    <div className="group-menu-item" onClick={this.removeGroup} style={{ cursor: 'pointer' }}>Delete This Group...</div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard
    };
};
const mapDispatchToProps = {
    onRemoveGroup,
};

export const GroupMenu = connect(mapStateToProps, mapDispatchToProps)(_GroupMenu);