import React from 'react'
import { CardDueDateSetter } from "../CardDueDateSetter"
import { CardNewChecklist } from "../CardNewChecklist"
// import { Upload } from "../../Upload"
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';

export function CardSidebar(props) {
    return (
        <div className="flex column">
            {/* <Upload /> */}
            <CardDueDateSetter dueDate={props.dueDate} onUpdateDueDate={props.onUpdateDueDate} />
            <button className="flex" onClick={props.toggleLabelPalette}><LabelOutlinedIcon /><span>Labels</span></button>
            <CardNewChecklist addActivity={props.addActivity} onUpdate={props.onUpdateChecklists} />
        </div>
    )
}