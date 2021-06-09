import React from 'react'
import { CardDueDateSetter } from "../CardDueDateSetter"
import { CardNewChecklist } from "../CardNewChecklist"
import { MemberList } from '../../BoardHeader/MemberList'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined'
import WebAssetOutlinedIcon from '@material-ui/icons/WebAssetOutlined'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import { CircularProgress } from '@material-ui/core'

export function CardSidebar(props) {
    return (
        <div className="card-sidebar-container flex column">
            <h3>Add to card</h3>
        <div className="card-sidebar flex">
            <MemberList members={props.card.members} onAddCardMember={props.onAddCardMember} onRemoveCardMember={props.onRemoveCardMember} allUsers={props.allUsers} card={props.card} showBig={true} />
            <button className="flex sidebar-button" onClick={props.toggleLabelPalette}><LabelOutlinedIcon /><span className="sidebar-button-text">Labels</span></button>
            <CardNewChecklist addActivity={props.addActivity} onUpdate={props.onUpdateChecklists} />
            <CardDueDateSetter dueDate={props.dueDate} onUpdateDueDate={props.onUpdateDueDate} alwaysShowButton={true} />
            {(props.isUploading) ? <button disabled><CircularProgress size='14px' /></button> : <button className="flex" onClick={props.toggleUploadDropzone}><AttachFileIcon /><span>Attachment</span></button>}
            { !props.card.cover && <button className="sidebar-button" ref={props.anchorRef} onClick={props.toggleCoverSelector}><WebAssetOutlinedIcon /><span>Cover</span></button>}
            </div>
        </div>
    )
}