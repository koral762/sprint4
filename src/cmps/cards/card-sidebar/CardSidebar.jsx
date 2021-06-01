import { CardDueDateSetter } from "../CardDueDateSetter"
import React from 'react'
import { CardNewChecklist } from "../CardNewChecklist"
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';

export function CardSidebar(props) {
    return (
        <div className="flex column">
            <CardDueDateSetter dueDate={props.dueDate} onUpdateDueDate={props.onUpdateDueDate} />
            <button className="flex" onClick={props.toggleLabelPalette}><LabelOutlinedIcon /><span>Labels</span></button>
            <CardNewChecklist addActivity={props.addActivity} onUpdate={props.onUpdateChecklists} />
        </div>
    )
}