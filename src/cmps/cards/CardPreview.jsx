import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardMenu } from './CardMenu'
class _CardPreview extends Component {
    state = {
        isEditing: false
    }
    onDetails = (ev) => {
        this.props.history.push(`/board/card/${this.props.card.id}`)
    }
    onOpenCardActions = (ev) => {
        ev.stopPropagation()
        this.onSetEditing()
    }
    onSetEditing = () => {
        this.setState({ isEditing: true })
    }
    onSetNotEditing = () => {
        this.setState({ isEditing: false })
    }
    render() {
        const card = this.props.card
        return (
            <div className="card-preview" onClick={this.onDetails}>
                {card.title}
                <button ref={this.ref} onClick={this.onOpenCardActions}>🖊</button>
                {(this.state.isEditing) ? <CardMenu props={this.props} onClose={this.onSetNotEditing}/> : <React.Fragment />}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard
    };
};
const mapDispatchToProps = {
};
export const CardPreview = connect(mapStateToProps, mapDispatchToProps)(_CardPreview);