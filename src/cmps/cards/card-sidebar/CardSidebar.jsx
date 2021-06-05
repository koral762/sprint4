import React from 'react'
import { CardDueDateSetter } from "../CardDueDateSetter"
import { CardNewChecklist } from "../CardNewChecklist"
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined'
import { MemberList } from '../../BoardHeader/MemberList'
import WebAssetOutlinedIcon from '@material-ui/icons/WebAssetOutlined'

export function CardSidebar(props) {
    return (
        <div className="card-sidebar flex column">
            { !props.card.cover && <button  className="sidebar-button" ref={props.anchorRef} onClick={props.toggleCoverSelector}><WebAssetOutlinedIcon /><span>Cover</span></button> }
            <CardDueDateSetter dueDate={props.dueDate} onUpdateDueDate={props.onUpdateDueDate} alwaysShowButton={true}/>
            <button className="flex sidebar-button" onClick={props.toggleLabelPalette}><LabelOutlinedIcon /><span className="sidebar-button-text">Labels</span></button>
            <CardNewChecklist addActivity={props.addActivity} onUpdate={props.onUpdateChecklists} />
            <MemberList members={props.card.members} onAddCardMember={props.onAddCardMember} onRemoveCardMember={props.onRemoveCardMember} allUsers={props.allUsers} card={props.card} showBig={true} />
        </div>
    )
}