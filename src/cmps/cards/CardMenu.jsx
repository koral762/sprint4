// // Edit card preivew - should have edit labels, change memebers change due date and archive
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateCard, onRemoveCard, addActivity } from '../../store/actions/board-actions.js'
import { boardService } from '../../services/board-service.js'
import { LabelPalette } from '../cards/card-sidebar/LabelPalette';
import { AddMemberModal } from '../BoardHeader/AddMemberModal';
import { CardDueDateSetter } from './CardDueDateSetter';
import { Button, Dialog } from '@material-ui/core';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import LabelIcon from '@material-ui/icons/Label';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import ShareIcon from '@material-ui/icons/Share';
import AccessTimeIcon from '@material-ui/icons/AccessTime';



class _CardMenu extends Component {

    state = {
        isOpen: false,
        offsetTop: null,
        offsetLeft: null,
        width: null,
        txtValue: '',
        isMemberListOpen: false,
        isLabelPaletteShown: false
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
        const pos = this.props.anchorEl.current.parentElement.getBoundingClientRect()
        console.log('pos', pos);
        this.setState({ offsetTop: pos.top, offsetLeft: pos.left, width: pos.width })
    }

    onClose = () => {
        this.props.onClose()
    }

    componentDidMount() {
        this.getParentPos()
        this.getCurrTitle()
    }

    componentDidUpdate(prevProps, prevState) {
        // if (prevState.isMemberListOpen) {
        //     this.setState({ isMemberListOpen: prevState.isMemberListOpen })
        // }
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

    createActivity = (txt) => {
        const activity = {
            "txt": txt,
            "commentTxt": '',
            "card": {
                "id": this.props.props.card.id,
                "title": this.props.props.card.title
            }
        }

        console.log('CREATING ACTIVITY FOR CARD ' + JSON.stringify(activity))

        return boardService.createActivity(activity)
    }

    onToggleLabelPaletteShown = () => {
        this.setState({ isLabelPaletteShown: !this.state.isLabelPaletteShown, isMemberListOpen: false })
    }

    toggleCardMembersMenu = () => {
        this.setState({ isMemberListOpen: !this.state.isMemberListOpen, isLabelPaletteShown: false })
    }

    onUpdateCardMembers = async (card) => {
        this.setState({ card }, () => {
            const activity = this.createActivity('edited the card members')
            this.submitCard(card, activity)
        })
    }

    onAddCardMember = (user) => {
        var members = JSON.parse(JSON.stringify(this.props.props.card.members))
        members.unshift(user)
        this.onChangeMembers(members, "added a member")
    }

    onRemoveCardMember = (user) => {
        var members = JSON.parse(JSON.stringify(this.props.props.card.members))
        members = members.filter(_user => _user._id != user._id)
        this.onChangeMembers(members, "removed a member")
    }

    onChangeMembers = (members, txt) => {
        const card = { ...this.props.props.card }

        card.members = members;
        console.log(members)
        this.setState({ card }, () => {
            const activity = this.createActivity(txt)
            this.submitCard(card, activity)
        })
    }

    onUpdateDueDate = async (dueDate) => {
        let card = { ...this.props.props.card }
        card.dueDate = dueDate

        this.setState({ card }, async () => {
            const activity = this.createActivity('updated due date')
            await this.submitCard(card, activity)

        })
    }

    render() {

        return (
            <Dialog onClose={this.props.onClose} open={true} >

                <div className="card-edit-container" onClick={(ev) => ev.stopPropagation()} style={{
                    left: `${this.state.offsetLeft}px`,
                    top: `${this.state.offsetTop}px`,
                    position: 'fixed'
                }}>
                    <div className="card-edit-left">
                        <div className="card-preview" style={{ width: `${this.state.width}px` }}>

                            <form>
                                <textarea className="card-preview-title-edit" autoFocus onKeyPress={this.onKeyPress} onChange={this.onChange} value={this.state.txtValue} />
                            </form>
                        </div>
                        <button className="save-btn" onClick={this.onUpdateHeader}>Save</button>
                    </div>


                    <div className="card-edit-right">
                        <div className="card-preview-edit-actions-container">

                            <Button style={{textTransform: 'none'}} onClick={this.onDeleteCard}><ArchiveOutlinedIcon /> <span>Delete card</span></Button>
                            <Button style={{textTransform: 'none'}} onClick={this.onToggleLabelPaletteShown}><LabelIcon /><span>Edit labels</span></Button>
                            <Button style={{textTransform: 'none'}} ref={this.ref} onClick={this.toggleCardMembersMenu}><PeopleAltOutlinedIcon /><span>Edit members</span></Button>
                            <CardDueDateSetter pplyStyle={true} dueDate={this.props.props.card.dueDate} onUpdateDueDate={this.onUpdateDueDate} alwaysShowButton={true} />
                            <Button style={{textTransform: 'none'}} onClick={this.onClose}><CloseRoundedIcon /><span>Close</span></Button>

                        </div>
                    </div>
                    {this.state.isLabelPaletteShown && <LabelPalette
                        createActivity={this.createActivity}
                        card={this.props.props.card}
                        isShownOnBoard={true}
                        style={{
                            left: `${-34}px`,
                            top: `${58}px`,
                            position: 'relative'
                        }}/>}
                    {(this.state.isMemberListOpen) ? <AddMemberModal 
                    ref={this.ref}
                    onCloseModal={this.toggleCardMembersMenu} 
                    allExistingUsers={this.props.board.members} 
                    card={this.props.props.card} 
                    members={this.props.props.card.members}
                    onAddCardMember={this.onAddCardMember}
                    onRemoveCardMember={this.onRemoveCardMember} 
                    style={{
                        left: `${92}px`,
                        top: `${78}px`,
                        position: 'relative'
                    }}/> : <React.Fragment />}
                </div>
            </Dialog >

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
    onRemoveCard,
    addActivity
};

export const CardMenu = connect(mapStateToProps, mapDispatchToProps)(_CardMenu);
