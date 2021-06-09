import React from 'react'
import { CardDetailsAttachment } from './CardDetailsAttachment'
import AttachFileIcon from '@material-ui/icons/AttachFile';

export function CardImagesList(props) {
    console.log(props)
    
    if (!props.attachments) return <React.Fragment />
    return (
        <div className="card-attachments-container">
        {/* <AttachFileIcon />  */}
        <h3>Attachments</h3>
      
            {props.attachments.map(att => <CardDetailsAttachment key={att.id} onUpdate={props.onUpdate} attachment={att} />)}
        </div>
    )
}