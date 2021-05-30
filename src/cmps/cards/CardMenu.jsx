// // Edit card preivew - should have edit labels, change memebers change due date and archive
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateCard, onRemoveCard } from '../../store/actions/board-actions.js'

class _CardMenu extends Component {

    state = {
        isOpen: false,
        offsetTop: null,
        offsetLeft: null,
        width: null,
        txtValue: '',
        isMemberListOpen: false
    }

    ref = React.createRef()

    submitCard = (card) => {
        return new Promise(resolve => {
            this.props.updateCard(this.props.board, card).then(() => {
                this.onClose()
            })
        })
    }

    getParentPos = () => {
        const pos = this.props.anchorEl.current.parentElement.parentElement.getBoundingClientRect()
        console.log(pos)
        this.setState({ offsetTop: pos.top, offsetLeft: pos.left, width: pos.width })
    }

    onClose = () => {
        this.props.onClose()
    }

    componentDidMount() {
        this.getCurrTitle()
    }


    onChange = (ev) => {
        const txtValue = ev.target.value
        this.setState({ txtValue })
    }

    onKeyPress = (ev) => {
        if (ev.key === 'Enter') return this.onUpdateHeader()
    }

    onUpdateHeader = () => {
        let card = { ...this.props.props.card }
        card.title = this.state.txtValue
        this.submitCard(card)
    }

    onDeleteCard = () => {
        let card = { ...this.props.props.card }
        card.deleteddAt = Date.now()
        this.props.onRemoveCard(this.props.board, card.id)
    }


    getCurrTitle() {
        const txtValue = this.props.props.card.title
        this.setState({ txtValue })
    }


    render() {

        return (
            <section>
                <div className="card-edit-container" onClick={(ev) => ev.stopPropagation()} style={{
                    left: `${this.state.offsetLeft}px`,
                    top: `${this.state.offsetTop}px`,
                    position: 'fixed'
                }}>
                    <div className="card-edit-left">
                        <form>
                            <textarea className="card-preview-title-edit" autoFocus onKeyPress={this.onKeyPress} onChange={this.onChange} value={this.state.txtValue} />
                            <button className="save-btn" onClick={this.onUpdateHeader}>Save</button>
                        </form>
                    </div>

                    <div className="card-edit-right">
                        <button ref={this.ref} onClick={this.onDeleteCard}><span>Delete Card</span></button>
                        <button className="close-btn" onClick={this.onClose}>Close</button>
                    </div>
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
    updateCard,
    onRemoveCard
};

export const CardMenu = connect(mapStateToProps, mapDispatchToProps)(_CardMenu);
