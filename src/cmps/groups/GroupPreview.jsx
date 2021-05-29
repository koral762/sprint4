import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardPreview } from '../cards/CardPreview'
import { addCard } from '../../store/actions/board-actions.js'
import { NewItem } from '../NewItem'
import { GroupMenu } from '../groups/GroupMenu'

class _GroupPreview extends Component {

    state = {
        currGroupName: '',
        currGroupId: null,
        isMenuShown: false,
        isChangeGroupShown: false
    }

    onAddCard = (txt) => {
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

    render() {

        const group = this.props.group

        return (
            <section className="card-list">
<<<<<<< HEAD
                <div className="group-header-wrapper flex align-center">
                    <textarea class="group-header" maxlength="512" >{group.title}</textarea>
                    <div class="list-header-extras">...</div>
                </div>
=======
                {group.title}
                <button onClick={this.toggleMenu} className="material-icons dots-icon">≡</button>
                {this.state.isMenuShown && <GroupMenu toggleMenu={this.toggleMenu} groupId={group.id}
                    onAdd={this.onAddCard} />}

>>>>>>> 7d947ac72aa2b39ce60c61fcaab000893a96a6d6
                {group.cards.map((card) => <CardPreview key={card.id}
                    card={card}
                />)}
                <div className="new-card-btn-container">
                    <NewItem addItemTxt={this.getAddItemTxt()} placeHolderTxt='Add a card title..' addBtnTxt="Add Card" onAdd={this.onAddCard} />
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
    addCard
};

export const GroupPreview = connect(mapStateToProps, mapDispatchToProps)(_GroupPreview);