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
import { CardImagesList } from './CardImagesList'
import { CardImgUpload } from './CardImgUpload';
import { withRouter } from 'react-router'
import { IconButton, Popover } from '@material-ui/core'
import SubtitlesIcon from '@material-ui/icons/Subtitles'
import CloseIcon from '@material-ui/icons/Close'
import ListIcon from '@material-ui/icons/List'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import { CoverSelector } from './CoverSelector'
import WebAssetOutlinedIcon from '@material-ui/icons/WebAssetOutlined'
class _CardDetails extends Component {

    state = {
        card: null,
        groupId: null,
        groupName: null,
        commentsOnly: false,
        isLabelPaletteShowing: false,
        isCoverSelectorShown: false,
        isUploading: false,
        isUploadZoneOpen: false
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

    toggleCoverSelector = () => {
        if (this.state.isCoverSelectorShown) return this.setState({ isCoverSelectorShown: false })
        return this.setState({ isCoverSelectorShown: true })
    }

    onCloseCard = () => {
        this.props.history.push(`/board/${this.props.board._id}`)
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

    onUpdateCover = (cover) => {
        const card = { ...this.state.card }
        card.cover = cover
        this.setState({ card }, async () => {
            const activity = this.createActivity('updated the cover')
            this.submitCard(card, activity)
        })
    }

    onAddCardMember = (user) => {
        var members = JSON.parse(JSON.stringify(this.state.card.members))
        members.unshift(user)
        this.onChangeMembers(members, "added a member")
    }

    onRemoveCardMember = (user) => {
        var members = JSON.parse(JSON.stringify(this.state.card.members))
        members = members.filter(_user => _user._id != user._id)
        this.onChangeMembers(members, "removed a member")
    }

    onChangeMembers = (members, txt) => {
        const card = { ...this.state.card }

        card.members = members;
        console.log(members)
        this.setState({ card }, () => {
            const activity = this.createActivity(txt)
            this.submitCard(card, activity)
        })
    }

    getCardCover = () => {
        const cover = this.state.card.cover
        if (!cover) return <React.Fragment />

        if (!cover.src) return (
            // if there is no src - this is a color
            <div className="card-details-cover-color" style={{ backgroundColor: cover.color }}>
                { cover &&
                    <IconButton onClick={this.onCloseCard} aria-label="close" className="card-details-cover-modal-close">
                        <CloseIcon />
                    </IconButton>}
                { cover && <button className="sidebar-button-with-cover" ref={this.ref} onClick={this.toggleCoverSelector}><WebAssetOutlinedIcon /><span>Cover</span></button>}
            </div>
        )
        return (
            <div className="card-details-cover-image" style={{ backgroundImage: `url(${cover.src})` }} >
                { cover &&
                    <IconButton onClick={this.onCloseCard} aria-label="close" className="card-details-cover-modal-close">
                        <CloseIcon />
                    </IconButton>}
                { cover && <button className="sidebar-button-with-cover" ref={this.ref} onClick={this.toggleCoverSelector}><WebAssetOutlinedIcon /><span>Cover</span></button>}
            </div>
        )
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
                <h4>Labels</h4>
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

    renderAttachments = (urlImg) => {
        return (
            <div>
                <section class="flex justify-space-between"><div class="flex">
                    <FileCopyIcon />
                    <h3>Attachments</h3></div></section>
                <img className="card-details-img-attach" src={urlImg} />
            </div>)
    }

    setUploading = () => {
        return new Promise(resolve => {
            this.setState({ isUploading: true }, resolve(true))
        })
    }

    onAddImage = (imgRef) => {
        const newImg = boardService.createImage(imgRef)
        const card = { ...this.state.card }
        if (!card.attachments) card.attachments = []
        card.attachments.push(newImg)
        const activity = this.createActivity('added an image')
        this.setState({ card }, async () => {
            await this.submitCard(card, activity)
            this.setState({ isUploading: false })
        })
    }

    onUpdateAttachments = async (newAttachment) => {
        const card = { ...this.state.card }
        const idx = card.attachments.findIndex(att => att.id === newAttachment.id)

        if (!newAttachment.title.length) {

            card.attachments.splice(idx, 1)
        } else {
            card.attachments[idx] = newAttachment
        }

        const activity = (newAttachment.title.length) ? this.createActivity('edited the title of an image') : this.createActivity('removed an image')

        this.setState({ card }, () => {
            this.submitCard(card, activity)
        })
    }

    toggleUploadDropzone = () => {
        if (this.state.isUploadZoneOpen) return this.setState({ isUploadZoneOpen: false })
        return this.setState({ isUploadZoneOpen: true })
    }

    render() {
        if (!this.state.card) {
            return ""
        }
        // (this.state.card && this.state.card.attachments) ?

        //         const urlImg = "url(" + (this.state.card && this.state.card.attachments) ? this.state.card.attachments : "" + ")"

        // console.log(this.state.card)
        return (
            <section className="card-details-modal flex column">
                <div className="modal-content">
                    {this.getCardCover()}
                    <div className="card-details-modal-container">
                        <div className="card-modal-title flex justify-space-between">
                            <div className="card-details-title flex">
                                <SubtitlesIcon />
                                <div>
                                    <CardTitle titleTxt={this.state.card.title} onUpdate={this.onUpdateTitle} />
                                    <div className="in-list">
                                    <span className="group-name">in list <u>{this.state.groupName}</u></span>
                                    </div>
                                </div>
                            </div>
                            {!this.state.card.cover &&
                                <IconButton onClick={this.onCloseCard} aria-label="close" id="modal-close" className="modal-close">
                                    <CloseIcon />
                                </IconButton>}
                        </div>
                        <div className="flex justify-space-between modal-content-wrapper">
                            <section className="main-modal-section">

                                <div className="card-details-data">
                                    {this.getLabels()}
                                    {(this.state.card.dueDate ? <div>
                                        <h4>Due Date</h4>
                                        <CardDueDateSetter onUpdateDueDate={this.onUpdateDueDate} dueDate={this.state.card.dueDate} displayDate={true} displayTime={true} />
                                    </div> : <React.Fragment />)}
                                </div>
                                <div>
                                    {/* { this.state.card.attachments ? JSON.stringify(this.state.card.attachments) : ""} */}
                                    {/* {(this.state.card && this.state.card.attachments) ? this.renderAttachments(urlImg) : ""} */}
                                    <CardImagesList onUpdate={this.onUpdateAttachments} attachments={this.state.card.attachments} />
                                    <CardDescription onUpdateDesc={this.onUpdateDesc} description={this.state.card.description} />
                                    <CardChecklistContainer checklists={this.state.card.checklists} onUpdate={this.onUpdateChecklists} />
                                    <CardImgUpload onAddImage={this.onAddImage} setUploading={this.setUploading} toggleOpen={this.toggleUploadDropzone} isOpen={this.state.isUploadZoneOpen} />
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
                                onUpdateChecklists={this.onUpdateChecklists}
                                members={this.state.card.members}
                                onAddCardMember={this.onAddCardMember} onRemoveCardMember={this.onRemoveCardMember}
                                allUsers={this.props.allUsers}
                                card={this.state.card}

                            />
                        </div>
                        <div>
                            <section className="flex justify-space-between">
                                <div className="flex modal-activity-title">
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
                        {this.state.isCoverSelectorShown && <CoverSelector card={this.state.card} anchorEl={this.ref} onUpdate={this.onUpdateCover} toggleList={this.toggleCoverSelector} />}
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
        allUsers: state.userModule.users,
        members: state.boardModule.currBoard.members
    };
};

const mapDispatchToProps = {
    loadBoard,
    updateCard,
    addActivity
};

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(connect(withRouter)(_CardDetails))
