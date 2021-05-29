
export function CardPreview({ card }) {


    return (
        <div className="card-preview flex justify-space-between">
            {card.title}
            <button>🖊</button>
        </div>
    )

}
