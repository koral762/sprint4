import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardMenu } from './CardMenu'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { CardPreviewDueDate } from './CardPreviewDueDate';
import { Draggable } from 'react-beautiful-dnd'

class _CardPreview extends Component {
    state = {
        isEditing: false
    }

    ref = React.createRef()


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
            <Draggable 
            draggableId={this.props.card.id} 
            index={this.props.index}>
                {(provided) => (
                    <section className="card-preview"
                        onClick={this.onDetails}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}>
                        <div className="card-preview-header">
                            {card.title}
                        </div>
                        <div className="card-preview-edit-container">
                            <div className="card-btn" ref={this.ref} onClick={this.onOpenCardActions}>
                                <EditOutlinedIcon fontSize="inherit" />
                                {(this.state.isEditing) ? <CardMenu anchorEl={this.ref} props={this.props} onClose={this.onSetNotEditing} /> : <React.Fragment />}
                            </div>
                            <div className="card-preview-attrs">
                                <CardPreviewDueDate dueDate={card.dueDate} />
                                {/* {this.getCardPreviewAttrs()} */}
                                {/* {this.getCardPreviewMembers()} */}
                            </div>
                        </div>
                        {provided.placeholder}

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
};

export const CardPreview = connect(mapStateToProps, mapDispatchToProps)(_CardPreview);