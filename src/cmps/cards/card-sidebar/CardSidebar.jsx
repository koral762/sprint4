import React from 'react'
import { CardDueDateSetter } from "../CardDueDateSetter"
import { CardNewChecklist } from "../CardNewChecklist"
// import { Upload } from "../../Upload"
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import { MemberList } from '../../BoardHeader/MemberList';

export function CardSidebar(props) {
    return (
        <div className="card-sidebar flex column">
            <CardDueDateSetter dueDate={props.dueDate} onUpdateDueDate={props.onUpdateDueDate} alwaysShowButton={true}/>
            <button className="flex sidebar-button" onClick={props.toggleLabelPalette}><LabelOutlinedIcon /><span className="sidebar-button-text">Labels</span></button>
            <CardNewChecklist addActivity={props.addActivity} onUpdate={props.onUpdateChecklists} />
            <MemberList members={props.card.members} allUsers={props.allUsers} card={props.card} showBig={true} />
        </div>
    )
}