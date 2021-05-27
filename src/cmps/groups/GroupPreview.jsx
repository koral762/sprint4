import { CardPreview } from '../cards/CardPreview'

export function GroupPreview({ group }) {
    console.log(group);
    return (
        <section className="card-list" style={{border: '1px solid black', margin:'5px'}}>
            {group.cards.map((card) => <CardPreview key={card.id}
                card={card}
                />)}
        </section>
    )
}