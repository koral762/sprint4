import { GroupPreview } from "./GroupPreview";

export function GroupList( {groups} ) {
    console.log(groups);
    if (!groups) return <h1>loading...</h1>
    return (
        <section className="group-list flex">
            {groups.map(group => <GroupPreview key={group.id} group={group} />)}
        </section>
    )
}