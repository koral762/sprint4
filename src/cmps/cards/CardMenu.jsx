// // Edit card preivew - should have edit labels, change memebers change due date and archive
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateCard, onRemoveCard } from '../../store/actions/board-actions.js'
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
        this.setState({ offsetTop: pos.top, offsetLeft: pos.left, width: pos.width })
    }

    onClose = () => {
        this.props.onClose()
    }

    componentDidMount() {
        this.getParentPos()
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

                                <Button onClick={this.onDeleteCard}><ArchiveOutlinedIcon /> <span>Delete Card</span></Button>
                                <Button><LabelIcon /><span>EDIT LABELS</span></Button>
                                <Button><PeopleAltOutlinedIcon /><span>EDIT MEMBERS</span></Button>
                                <Button><AccessTimeIcon /><span>SET DUE DATE</span></Button>
                                <Button><ShareIcon /><span>SHARE</span></Button>
                                <Button onClick={this.onClose}><CloseRoundedIcon /><span>CLOSE</span></Button>

                            </div>
                        </div>
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
    onRemoveCard
};

export const CardMenu = connect(mapStateToProps, mapDispatchToProps)(_CardMenu);
