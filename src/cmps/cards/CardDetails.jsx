import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadBoard, updateCard, addActivity } from '../../store/actions/board-actions'
import { boardService } from '../../services/board-service'
import { CardDescription } from './CardDescription'
import { CardAddComment } from './CardAddComment'
import { ActivityLog } from '../ActivityLog'
import { withRouter } from 'react-router'
import CloseIcon from '@material-ui/icons/Close'
import { IconButton } from '@material-ui/core'

class _CardDetails extends Component {

    state = {
        card: null,
        groupId: null,
        groupName: null,
        commentsOnly: false
    }

    componentDidMount() {
        console.log('Did mount boardId: ' + this.props.boardId + ' cardId' + this.props.cardId)
        if (this.props.boardId && this.props.cardId) {
            this.props.loadBoard(this.props.boardId).then(() => {
                console.log('After then')
                this.getCardDetails()
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cardId !== this.props.cardId) {
            this.getCardDetails()
        }
    }

    getCardDetails = () => {
        console.log('Get card details ' + this.props.cardId)
        let foundCard = false;
        this.props.board.groups.forEach(group => {
            group.cards.forEach(card => {
                if (card.id === this.props.cardId) {
                    const groupId = group.id
                    const groupName = group.title
                    foundCard = true
                    console.log('Found card ' + this.props.cardId)
                    this.setState({ groupId, groupName, card })
                    return
                }
            })
        })

        if (!foundCard) {
            console.log('Could not find card')
        }
    }

    onCloseCard = () => {
        this.props.history.push(`/board/`)
    }

    submitCard = (card, activity) => {
        return new Promise(resolve => {
            this.props.updateCard(this.props.board, card, activity).then(() => resolve())
        })
    }

    onUpdateDesc = async (description) => {
        const card = { ...this.state.card }
        card.description = description

        this.setState({ card }, async () => {
            const activity = this.createActivity('updated the description')
            this.submitCard(card, activity)
        })
    }

    createActivity = (txt) => {
        const activity = {
            "txt": txt,
            "commentTxt": '',
            "card": {
                "id": this.state.card.id,
                "title": this.state.card.title
            }
        }

        return boardService.createActivity(activity)
    }

    onAddComment = (txt) => {
        const newActivity = this.createActivity(txt)

        this.props.addActivity(this.props.board, newActivity)

    }

    toggleCommentsOnly = () => {
        if (this.state.commentsOnly) return this.setState({ commentsOnly: false })
        return this.setState({ commentsOnly: true })
    }

    getFilteredActivities = () => {
        const card = this.state.card
        const activities = this.props.board.activities
        if (!activities) return []
        let cardActivities = activities.filter(activity => activity.card.id === card.id)
        if (this.state.commentsOnly) cardActivities = cardActivities.filter(activity => {
            if (activity.commentTxt.length) return activity
        })
        return cardActivities
    }

    render() {
        if (!this.state.card) {
            return <div>Loading...</div>
        }
        // console.log(this.state.card)
        return (
            <section className="card-details-modal flex column">
            <div className="modal-content">
                <div className="card-modal-header flex column ">
                    <div className="card-modal-title flex justify-space-between">
                        <div className="card-details-title">
                            {this.state.card.title}<br />
                            <span className="group-name">in list <u>{this.state.groupName}</u></span>
                        </div>
                        <IconButton onClick={this.onCloseCard} aria-label="close" className="modal-close">
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div>
                        <CardDescription onUpdateDesc={this.onUpdateDesc} description={this.state.card.description} />
                    </div>
                </div>
                <div>
                    <h3>Activity</h3>
                    <button onClick={this.toggleCommentsOnly}>{(this.state.commentsOnly) ? 'Show Details' : 'Hide Details'}</button>
                </div>
                <CardAddComment onAddComment={this.onAddComment} />
                <ActivityLog
                    boardId={this.props.board._id}
                    displayMode="card"
                    activities={this.getFilteredActivities()} />
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
    loadBoard,
    updateCard,
    addActivity
};

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(connect(withRouter)(_CardDetails))
