import React, { Component } from 'react'
import { connect } from 'react-redux';
import {onRemoveGroup} from '../../store/actions/board-actions.js'
import { ClickAwayListener } from '@material-ui/core';

export class _GroupMenu extends Component {

    addCard = (ev) => {
        // currently adding without moving to focus to new card
        // need to focus on "NewItem" and set its state with the help of parent element (same parent)
        ev.stopPropagation()
        this.props.onAdd('New Card..')
    }

    removeGroup=(ev)=>{
        ev.stopPropagation()
        this.props.onRemoveGroup(this.props.board,this.props.groupId)
        this.props.toggleMenu()
    }

    render() {
        return (
            <ClickAwayListener onClickAway={() => this.props.toggleMenu()}>
                <div className="group-menu-container">
                    <div>List Actions</div>
                    <div><hr /></div>
                    <div onClick={this.addCard}  className="group-menu-item">+ Add Card...</div>
                    <div className="group-menu-item" >Delete All Cards...</div>
                    <div><hr /></div>
                    <div className="group-menu-item" onClick={this.removeGroup}>Delete This Group...</div>
                </div>
            </ClickAwayListener>
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