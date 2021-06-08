import React, { Component } from 'react'
import { MemberPreview } from './MemberPreview';
import { AddMemberModal } from './AddMemberModal';
import AddIcon from '@material-ui/icons/Add';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

export class MemberList extends Component {

    state = {
        isModalShown: false
    }

    onShowModal = () => {
        this.setState({ isModalShown: true })
    }
    
    onCloseModal = () => {        
        this.setState({ isModalShown: false })
    }

    renderMemberList = (members) => { 
        return (<div className="members-container">
                    <div className={"member-preview add-member-btn" + (this.props.showBig ? " member-preview-big" : "")} onClick={() => this.onShowModal()}><AddIcon className="members-list-add-button"/></div>
                    <div className="add-member-modal-container">
                        { this.state.isModalShown && <AddMemberModal onCloseModal={this.onCloseModal} allExistingUsers={this.props.allUsers} card={this.props.card} members={this.props.members}/>}
                    </div>
                    {members.map(member => {
                        return <MemberPreview key={member._id}
                            name={member.fullName} 
                            imgUrl={member.imgUrl}
                            showBig={this.props.showBig}/>
                    })}
                </div>)}

    renderCardDetailsMemberList = (members) => {
        return (
        <>
            {this.state.isModalShown && <AddMemberModal onCloseModal={this.onCloseModal} allExistingUsers={this.props.allUsers} card={this.props.card} members={members} onAddCardMember={this.props.onAddCardMember} onRemoveCardMember={this.props.onRemoveCardMember}/>}
            <button class="flex sidebar-button" onClick={() => this.onShowModal()}>
            <PeopleAltIcon/>
            <span class="sidebar-button-text">Members</span>
            </button>
        </>)
    }
    
    render(){
        const members = this.props.card ? this.props.card.members : this.props.members
        if (!members) return <h4>Loading...</h4>
        return !this.props.card ? this.renderMemberList(members) : this.renderCardDetailsMemberList(members)
    }
}
