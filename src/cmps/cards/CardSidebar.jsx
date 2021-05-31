import { CardDueDateSetter } from "./CardDueDateSetter"
import React from 'react'
import { CardNewChecklist } from "./CardNewChecklist"
import { Button, CircularProgress } from "@material-ui/core"
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export function CardSidebar(props) {

    return (
        <div>
            <CardDueDateSetter dueDate={props.dueDate} onUpdateDueDate={props.onUpdateDueDate} />
            <CardNewChecklist addActivity={props.addActivity} onUpdate={props.onUpdateChecklists} />
        </div>
    )
}