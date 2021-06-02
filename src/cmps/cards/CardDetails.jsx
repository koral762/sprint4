import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadBoard, updateCard, addActivity } from '../../store/actions/board-actions'
import { boardService } from '../../services/board-service'
import { CardDescription } from './CardDescription'
import { CardAddComment } from './CardAddComment'
import { ActivityLog } from './card-sidebar/ActivityLog'
import { CardTitle } from './CardTitle'
import { CardDueDateSetter } from './CardDueDateSetter'
import { CardChecklistContainer } from './CardChecklistContainer.jsx'
import { CardSidebar } from './card-sidebar/CardSidebar'
import { CardLabels } from './CardLabels'
import { LabelPalette } from './card-sidebar/LabelPalette'
import { withRouter } from 'react-router'
import { IconButton, Popover } from '@material-ui/core'
import SubtitlesIcon from '@material-ui/icons/Subtitles'
import CloseIcon from '@material-ui/icons/Close'
import ListIcon from '@material-ui/icons/List'
import { CardPreviewDueDate } from './CardPreviewDueDate'

class _CardDetails extends Component {

    state = {
        card: null,
        groupId: null,
        groupName: null,
        commentsOnly: false,
        isLabelPaletteShowing: false
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

    ref = React.createRef()

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

    onAddComment = (txt) => {
        const activity = {
            "txt": "",
            "commentTxt": txt,
            "card": {
                "id": this.state.card.id,
                "title": this.state.card.title
            }
        }
        const newActivity = boardService.createActivity(activity)
        this.props.addActivity(this.props.board, newActivity)
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

        console.log('CREATING ACTIVITY FOR CARD ' + JSON.stringify(activity))

        return boardService.createActivity(activity)
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
            console.log(JSON.stringify(activity))
            if (activity.commentTxt) return activity
        })
        // console.log(JSON.stringify(cardActivities))
        return cardActivities
    }

    onUpdateTitle = async (txt) => {
        let card = { ...this.state.card }
        card.title = txt
        this.setState({ card }, async () => {
            const activity = this.createActivity('updated the title')
            this.submitCard(card, activity)
        })
    }

    onUpdateDueDate = async (dueDate) => {
        let card = { ...this.state.card }
        card.dueDate = dueDate

        this.setState({ card }, async () => {
            const activity = this.createActivity('updated due date')
            await this.submitCard(card, activity)

        })
    }

    onUpdateChecklists = (newChecklist, activityTxt) => {

        const card = { ...this.state.card }
        if (!card.checklists) {
            card.checklists = []
        }
        // updating
        const checklistIdx = card.checklists.findIndex(checklist => checklist.id === newChecklist.id)
        if (checklistIdx >= 0) {
            card.checklists = card.checklists.map(checklist => {
                if (checklist.id === newChecklist.id) return newChecklist
                return checklist
            })
        } else {
            card.checklists.push(newChecklist)
        }

        // removing excess checklists
        card.checklists = card.checklists.filter(checklist => {
            if (checklist.title) return checklist
        })

        this.setState({ card }, () => {
            if (activityTxt) {
                let activity = this.createActivity(activityTxt)

                this.submitCard(card, activity)
            } else {
                this.submitCard(card)
            }
        })
    }

    getLabels = () => {
        const labels = this.state.card.labels
        if (labels && labels.length) return (
            <div className="card-details-label-container">
                <h5>Labels</h5>
                <CardLabels
                    onClickLabel={this.openEditLabelsModal}
                    cardLabels={labels}
                    boardLabels={this.props.board.labels}
                    preview={false}
                />
            </div>
        )
        return <React.Fragment />
    }

    toggleLabelPalette = () => {
        this.setState({ isLabelPaletteShowing: !this.state.isLabelPaletteShowing })
    }

    render() {
        if (!this.state.card) {
            return null
        }
        // console.log(this.state.card)
        return (
            <section className="card-details-modal flex column">
                <div className="modal-content">
                    <div className="card-modal-title flex justify-space-between">
                        <div className="card-details-title flex">
                            <SubtitlesIcon />
                            <div>
                                <CardTitle titleTxt={this.state.card.title} onUpdate={this.onUpdateTitle} />
                                <span className="group-name">in list <u>{this.state.groupName}</u></span>
                            </div>
                        </div>
                        <IconButton onClick={this.onCloseCard} aria-label="close" className="modal-close">
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className="flex justify-space-between">
                        <section className="main-modal-section">
                            <div className="labels-and-due-date">
                                {this.getLabels()}
                                {(this.state.card.dueDate ? <div>
                                    <h5>Due Date</h5>
                                    <CardDueDateSetter onUpdateDueDate={this.onUpdateDueDate} dueDate={this.state.card.dueDate} displayDate={true} displayTime={true} />
                                </div> : <React.Fragment />)}
                            </div>
                            <div>
                                <CardDescription onUpdateDesc={this.onUpdateDesc} description={this.state.card.description} />
                                <CardChecklistContainer checklists={this.state.card.checklists} onUpdate={this.onUpdateChecklists} />
                            </div>
                        </section>
                        <CardSidebar
                            anchorRef={this.ref}
                            ref={this.ref}
                            addActivity={this.createActivity}
                            isUploading={this.state.isUploading}
                            toggleCoverSelector={this.toggleCoverSelector}
                            toggleUploadDropzone={this.toggleUploadDropzone}
                            toggleDisplayMembers={this.toggleDisplayMembers}
                            dueDate={this.state.card.dueDate}
                            toggleLabelPalette={this.toggleLabelPalette}
                            onUpdateDueDate={this.onUpdateDueDate}
                            onArchiveCard={this.onArchiveCard}
                            onUpdateChecklists={this.onUpdateChecklists} />
                    </div>
                    <div>
                        <section className="flex justify-space-between">
                            <div className="flex">
                                <ListIcon />
                                <h3>Activity</h3>
                            </div>
                            <button onClick={this.toggleCommentsOnly}>{(this.state.commentsOnly) ? 'Show Details' : 'Hide Details'}</button>
                        </section>
                        <CardAddComment onAddComment={this.onAddComment} />
                        <ActivityLog
                            boardId={this.props.board._id}
                            displayMode="card"
                            activities={this.getFilteredActivities()} />
                    </div>
                    <Popover
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'left',
                        }}
                        open={this.state.isLabelPaletteShowing}
                        anchorEl={this.ref.current}
                        onClose={this.toggleLabelPalette}
                        onBackdropClick={this.toggleLabelPalette}>
                        <LabelPalette createActivity={this.createActivity} card={this.state.card} />
                    </Popover>
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
