// Edit card preivew - should have edit labels, change memebers change due date and archive
import React, { Component } from 'react'

import { Button, Dialog } from '@material-ui/core';
import { CardLabels } from './CardLabels';
import { connect } from 'react-redux';

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

    submitCard = (card,activity) => {
        return new Promise(resolve => {
            this.props.updateCard(this.props.board, card,activity).then(() => {
                this.onClose()
            })
        })
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

   
    onDeleteCard =   () => {
        let card = { ...this.props.props.card }
        card.archivedAt = Date.now()
        const activity = this.createActivity('archived')
        this.submitCard(card,activity)
         
    }


    getParentPos = () => {
        const pos = this.props.anchorEl.current.parentElement.parentElement.getBoundingClientRect()
        console.log(pos)
        this.setState({ offsetTop: pos.top, offsetLeft: pos.left, width: pos.width })
    }

    getCurrTitle() {
        const txtValue = this.props.props.card.title
        this.setState({ txtValue })
    }


    render() {
        if (!this.state.offsetTop || !this.state.offsetLeft) return <div></div>
        const props = this.props.props

        return (

            <Dialog onClose={this.props.onClose} open={true} >
                <div  className="card-edit-container" onClick={(ev) => ev.stopPropagation()} style={{
                    left: `${this.state.offsetLeft}px`,
                    top: `${this.state.offsetTop}px`,
                    position: 'fixed'
                }}>
                                        
                    <div className="card-edit-left">

                        <div className="card-preview" style={{ width: `${this.state.width}px` }}>
                            {this.getCardCover()}
                            {this.props.cardStyle}
                            <CardLabels
                                cardLabels={props.card.labels}
                                boardLabels={props.board.labels}
                                preview={true}
                            />
                            <form>
                                <textarea className="card-preview-header card-preview-title-edit" autoFocus onKeyPress={this.onKeyPress} onChange={this.onChange} value={this.state.txtValue} />
                            </form>

                            
                        </div>
                        <button className="save-btn" onClick={this.onUpdateHeader}>Save</button>
                    </div>
                    <div  className="card-edit-right">
                        <div className="card-preview-edit-actions-container">
                            <Button onClick={this.onArchiveCard}><span>Delete Card</span></Button>
                            
                        </div>
                    </div>

                </div>
            </Dialog>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard
    };
};
const mapDispatchToProps = {
    // updateCard,
    // addActivity
};

export const CardMenu = connect(mapStateToProps, mapDispatchToProps)(_CardMenu);
