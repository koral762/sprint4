import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardMenu } from './CardMenu'
import { CardPreviewDueDate } from './CardPreviewDueDate';
import { Draggable } from 'react-beautiful-dnd'
import { CardLabels } from './CardLabels'
import { toggleFullLabels } from '../../store/actions/board-actions.js';
import { MemberPreview } from '../BoardHeader/MemberPreview';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';


class _CardPreview extends Component {
    state = {
        isEditing: false
    }

    ref = React.createRef()

    componentDidMount = () => {
        console.log('des', this.props.card.attachments);

    }
    getCardPreviewAttachments = () => {
        const cardAtt = this.props.card.attachments
        if (!cardAtt || !Object.keys(cardAtt) || !cardAtt.length) return null
        return <div key="0" className="card-preview-attr"><AttachFileOutlinedIcon style={{ fontSize: 16 }} /></div>
    }

    getCardPreviewHoldDesc = () => {
        const cardDesc = this.props.card.description
        if (!cardDesc || !Object.keys(cardDesc)) return null
        return <div key="1" className="card-preview-attr"><SubjectOutlinedIcon style={{ fontSize: 16 }} /></div>
    }

    getCardPreviewComments = () => {
        let activities = this.props.board.activities
        if (!activities) return null
        let cardComm = activities.filter(activity => activity.card.id === this.props.card.id)
        cardComm = cardComm.filter(activity => {
            if (activity.commentTxt) return activity
            return null
        })
        if (!cardComm || !cardComm.length) return null

        return <div key="3" className="card-preview-attr"><ChatBubbleOutlineRoundedIcon style={{ fontSize: 16 }} /> {cardComm.length}</div>
    }

    getCardPreviewChecklist = () => {
        const checklists = this.props.card.checklists
        if (!checklists || !checklists.length) return null

        let doneTodos = 0
        let totalTodos = 0

        let doneClass = ''

        checklists.forEach(checklist => {
            checklist.todos.forEach(todo => {
                if (todo.isDone) {
                    doneTodos += 1
                }
                totalTodos += 1
            })
        })

        if (!totalTodos) return null
        if (doneTodos === totalTodos) {
            doneClass = " card-preview-checklist-counter-done"
        }
        return <div key="2" className={`card-preview-attr card-preview-checklist-counter${doneClass}`}><CheckBoxOutlinedIcon style={{ fontSize: 16 }} /> <span>{doneTodos}/{totalTodos}</span> </div>
    }

    getCardPreviewMembers = () => {
        const cardMembers = this.props.card.members
        if (!cardMembers || !cardMembers.length) return <React.Fragment />

        const cardMembersEl = cardMembers.map((member, idx) => {
            return <MemberPreview key={idx} name={member.fullName} imgUrl={member.imgUrl} />
        })

        return <div className="card-preview-members">{cardMembersEl}</div>
    }

    getCardPreviewAttrs = () => {
        // test all attributes
        const attrs = [
            this.getCardPreviewAttachments(),
            this.getCardPreviewHoldDesc(),
            this.getCardPreviewChecklist(),
            this.getCardPreviewComments()
        ]
        // if at least one of them is true OR there are members assing to this card - render the card-preview-attrs div
        if (this.getCardPreviewMembers() || !attrs.every(item => !item)) {
            return (<div className="card-preview-attrs">
                {attrs.map((att, idx) => {
                    if (att) return att
                    return <React.Fragment key={idx} />
                })}
            </div>)
        }
    }


    onDetails = (ev) => {
        this.props.history.push(`/board/${this.props.board._id}/card/${this.props.card.id}`)
    }

    onOpenCardActions = (ev) => {
        ev.stopPropagation()
        this.onSetEditing()
    }

    onToggleLabels = (ev) => {
        ev.stopPropagation()
        return this.props.toggleFullLabels()
    }

    onSetEditing = () => {
        this.setState({ isEditing: true })
    }

    onSetNotEditing = () => {
        this.setState({ isEditing: false })
    }

    getCardCover = () => {

        const cardCover = this.props.card.cover
        if (!cardCover) return <React.Fragment />
        if (!cardCover.src) return (
            // if there is no src - this is a color
            <div className="card-preview-cover-color" style={{backgroundColor:cardCover.color}} />
        )
        return (
            <div className="card-preview-cover-image" style={{backgroundImage:`url(${cardCover.src})`}} /> 
        )
    }

    render() {
        const card = this.props.card
        const strStyle="url("+card.attachments+")"

        const cardAttachStyle = {
            backgroundImage: strStyle,
        }

        return (
            <Draggable
                draggableId={this.props.card.id}
                index={this.props.index}>
                {(provided) => (
                    <section className="card-preview flex justify-space-between"
                        onClick={this.onDetails}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}>
                        <div className="attach-div">
                            <div className="card-preview-start">
                            {this.getCardCover()}
                            {card.attachments && <img className="img-attach" style={cardAttachStyle}/>}
                                <CardLabels onClickLabel={this.onToggleLabels}
                                    isFull={this.props.fullLabel}
                                    cardLabels={card.labels}
                                    boardLabels={this.props.board.labels}
                                    preview={true}
                                />
                                <div className="card-preview-header">
                                    {card.title}
                                </div>
                            </div>
                            <div className="card-preview-attrs">
                                <CardPreviewDueDate dueDate={card.dueDate} />
                                {this.getCardPreviewAttrs()}
                                {this.getCardPreviewMembers()}
                            </div>

                        </div>
                        <div className="card-btn" ref={this.ref} onClick={this.onOpenCardActions}>
                            <EditOutlinedIcon fontSize="inherit" />
                            {(this.state.isEditing) ? <CardMenu anchorEl={this.ref} props={this.props} onClose={this.onSetNotEditing} /> : <React.Fragment />}
                        </div>
                        {provided.placeholder}
                    </section>
                )
                }
            </Draggable>

        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
        fullLabel: state.boardModule.fullLabel

    };
};

const mapDispatchToProps = {
    toggleFullLabels
};

export const CardPreview = connect(mapStateToProps, mapDispatchToProps)(_CardPreview);