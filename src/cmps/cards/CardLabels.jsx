import React from 'react'

export function CardLabels(props) {
    if (!props.cardLabels || !props.boardLabels) return <React.Fragment />
    
    function displayLabel(label) {
        const boardLabel = props.boardLabels.find(boardLabel => boardLabel.id === label.id)
        if (!props.preview) return (
            <div className={`card-details-label ${boardLabel?.color}`}>
                    {boardLabel?.name}
            </div>
        )
        if (props.isFull) return (
            <div className={`card-preview-full-label ${boardLabel?.color}`}>
                    {boardLabel?.name}
            </div>
        )
        return (
            <div className={`card-preview-collapsed-label ${boardLabel?.color}`}>
            </div>
        )
    }

    return (
        <div className="card-preview-labels flex">
            {props.cardLabels.map((label, idx) => {
                return <div onClick={props.onClickLabel} key={idx} > {displayLabel(label)} </div>
            })
            }
        </div>
    )
}