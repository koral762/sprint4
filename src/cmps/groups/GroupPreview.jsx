import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { CardPreview } from '../cards/CardPreview'
import { addCard, setNewGroupName } from '../../store/actions/board-actions.js'
import { NewItem } from '../NewItem'
import { GroupMenu } from '../groups/GroupMenu'
import { ClickAwayListener } from '@material-ui/core';

class _GroupPreview extends Component {
    state = {
        currGroupName: '',
        currGroupId: null,
        isMenuShown: false,
        isChangeGroupShown: false
    }

    onAddCard = (txt) => {
        console.log('group preview',this.props.group);
        return this.props.addCard(this.props.board, txt, this.props.group.id)
    }

    getAddItemTxt = (txt) => {
        if (this.props.group.cards.length) return 'Add another card'
        return 'Add a card'
    }

    handleChangeGroupName = (ev) => {
        this.setState({ currGroupName: ev.target.value })
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const { currGroupId, currGroupName } = this.state
        this.props.setNewGroupName(currGroupId, currGroupName, this.props.board)
        this.setState({ isChangeGroupShown: false })
    }

    toggleMenu = (ev = null) => {
        if (ev) ev.stopPropagation()
        const isShown = !this.state.isMenuShown
        this.setState({ isMenuShown: isShown })
    }

    onKeyPress = (ev) => {
        if (ev === 'Enter') {
            this.closeChangeGroupName(ev)
        }
    }

    openHeadrEdit = (ev = null) => {
        if (ev) ev.stopPropagation()
        this.setState({ isChangeGroupShown: true })
    }

    closeChangeGroupName = (ev) => {
        this.setState({ isChangeGroupShown: false })
        this.onSubmit(ev)
    }

    onOpenChangeGroupName = (id, groupName) => {
        this.setState({ currGroupId: id, currGroupName: groupName, isChangeGroupShown: true })
    }
    render() {
        const group = this.props.group

        return (
            <Draggable draggableId={group.id} index={this.props.index}>
                {(provided) => (
                    <section
                        className="card-list"
                        ref={provided.innerRef}
                        {...provided.draggableProps}>
                        <div className="group-preview-header" {...provided.dragHandleProps} >
                            {!this.state.isChangeGroupShown
                                && <div onClick={() =>
                                    this.onOpenChangeGroupName(group.id, group.title)}>{group.title}</div>}
                            {(this.state.isChangeGroupShown) ?
                                <ClickAwayListener onClickAway={this.closeChangeGroupName}>
                                    <form onSubmit={this.onSubmit} className="change-group-name">
                                        <input className="change-group-name-input"
                                            type="text"
                                            name="group-name"
                                            onKeyPress={this.onKeyPress}
                                            onChange={this.handleChangeGroupName}
                                            defaultValue={group.title}
                                            autoFocus spellCheck="false" autoComplete="off"
                                            onFocus={ev => ev.target.select()} />
                                    </form>
                                </ClickAwayListener> : ''}
                            <span onClick={this.toggleMenu} className="list-header-extras material-icons dots-icon">more_horiz</span>
                            {this.state.isMenuShown
                                && <GroupMenu
                                    toggleMenu={this.toggleMenu}
                                    groupId={group.id}
                                    onAdd={this.onAddCard} />}
                        </div>
  
                        <Droppable droppableId={group.id} type="card">
                            {(provided) => (
                                <div className="cards-content-wrapper"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}>
                                    {group.cards.map((card, index) => {
                                        if (!card.archivedAt) {
                                            return <CardPreview key={card.id} card={card} index={index} history={this.props.history} />
                                        }
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <div className="new-card-btn-container" id="add-btn">
                            <NewItem addItemTxt={this.getAddItemTxt()} placeHolderTxt='Add a card title..' addBtnTxt="Add Card" onAdd={this.onAddCard} />
                        </div>
                    </section>
                )}
            </Draggable>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard
    };
};

const mapDispatchToProps = {
    addCard,
    setNewGroupName
};

export const GroupPreview = connect(mapStateToProps, mapDispatchToProps)(_GroupPreview);