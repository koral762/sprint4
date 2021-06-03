import React, { Component } from 'react'
import { MemberPreview } from './MemberPreview';
import { AddMemberModal } from './AddMemberModal';
import AddIcon from '@material-ui/icons/Add';

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
    
    render(){
        const { members } = this.props
        if (!members) return <h4>loading</h4>

        return (
            <div className="members-container">
                <div className={"member-preview add-member-btn" + (this.props.showBig ? " member-preview-big" : "")} onClick={() => this.onShowModal()}><AddIcon className="members-list-add-button"/></div>
                <div className="add-member-modal-container">
                    {this.state.isModalShown && <AddMemberModal onCloseModal={this.onCloseModal} allExistingUsers={this.props.allUsers} card={this.props.card} members={this.props.members}/>}
                </div>
                {
                    members.map(member => {
                        return <MemberPreview key={member._id}
                            name={member.fullName} 
                            imgUrl={member.imgUrl}
                            showBig={this.props.showBig}
                            />
                })}
            </div>
        )
    }
}
