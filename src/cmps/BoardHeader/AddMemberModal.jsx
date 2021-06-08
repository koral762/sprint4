import React, { Component } from 'react'
import { connect } from 'react-redux';
import { MemberPreview } from './MemberPreview'
import { ClickAwayListener } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { addToMembers, removeMember, addCardMember, removeCardMember } from '../../store/actions/board-actions.js';
import { loadAllUsers } from '../../store/actions/user-actions.js';


export class _AddMemberModal extends Component {

    state = {
        searchLetters: ''
    }

    toggleUser=(user)=>{
        // Not a member
        if (!this.props.members.find(member => member._id === user._id)) {
            if (!this.props.card) {
                this.props.addToMembers(user, this.props.board)
            }
            else {
                this.props.addCardMember(this.props.board, this.props.card, user)
                this.props.onAddCardMember(user)
            }
        } else {
            
            if (!this.props.card) {
                this.props.removeMember(user._id, this.props.board)
            }
            else {
                this.props.removeCardMember(this.props.board, this.props.card, user._id)
                this.props.onRemoveCardMember(user)
            }   
        }
    }
 
    getMembers=(id)=>{
        return this.props.members.find(member => {
            if (member._id === id) return true
            else return false
        })
    }

    handleChange = ({ target }) =>{
        const search = target.value
        this.setState({ searchLetters: search })
    }

    render() {
        
        const { members, allUsers } = this.props
        
        if(!members) return <div>loading</div>
        return (
            <ClickAwayListener onClickAway={this.props.onCloseModal}>
                <div className="add-member-modal" style={this.props.style}>
                    <h3>Members</h3>
                    <input type="search" onChange={this.handleChange} name="search-member" id="" autoCorrect="off" autoComplete="off"/>
                    <div className="add-members-container">
                        {allUsers.filter(user => 
                        !this.state.searchLetters ? true : user.fullName.includes(this.state.searchLetters)).map(user => {
                                return <div key={user._id} className="member-container" onClick={() => this.toggleUser(user)}>
                                    <MemberPreview name={user.fullName} imgUrl={user.imgUrl} /> 
                                    <p>{user.fullName}</p>
                                    {this.getMembers(user._id) && <div><CheckIcon /></div>}
                                </div>
                            })
                        }
                    </div>
                </div>
            </ClickAwayListener>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
        allUsers: state.userModule.users
    };
};
const mapDispatchToProps = {
    loadAllUsers,
    addToMembers,
    addCardMember,
    removeMember,
    removeCardMember
};

export const AddMemberModal = connect(mapStateToProps, mapDispatchToProps)(_AddMemberModal);
