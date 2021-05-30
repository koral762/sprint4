import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardMenu } from './CardMenu'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

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
            <section className="card-preview" onClick={this.onDetails}>
                <div className="card-preview-header">
                    {card.title}
                </div>
                <div className="card-preview-edit-container">
                    <div className="card-btn" ref={this.ref} onClick={this.onOpenCardActions}><EditOutlinedIcon fontSize="inherit" /></div>
                    {(this.state.isEditing) ? <CardMenu props={this.props} onClose={this.onSetNotEditing} /> : <React.Fragment />}
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
};

export const CardPreview = connect(mapStateToProps, mapDispatchToProps)(_CardPreview);