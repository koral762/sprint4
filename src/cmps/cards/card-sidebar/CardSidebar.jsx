import { CardDueDateSetter } from "../CardDueDateSetter"
import React from 'react'
import { CardNewChecklist } from "../CardNewChecklist"
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';

export function CardSidebar(props) {
    return (
        <div className="card-sidebar flex column">
            <CardDueDateSetter dueDate={props.dueDate} onUpdateDueDate={props.onUpdateDueDate} alwaysShowButton={true}/>
            <button className="flex sidebar-button" onClick={props.toggleLabelPalette}><LabelOutlinedIcon /><span className="sidebar-button-text">Labels</span></button>
            <CardNewChecklist addActivity={props.addActivity} onUpdate={props.onUpdateChecklists} />
        </div>
    )
}