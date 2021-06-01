import React, { Component } from 'react'
import { AddNewGroup } from './AddNewGroup';
import { GroupPreview } from "./GroupPreview";
import { Droppable } from "react-beautiful-dnd";




export class GroupList extends Component {
    state = {
        isNewGroupShown: false,
        groups: null,
    }

    closeNewGroup = () => {
        this.setState({ isNewGroupShown: false })
    }

    render() {
        const { groups, onAddGroup } = this.props
        if (!groups) return <h1>Loading...</h1>

        return (
            <section className="group-list flex">
                <Droppable droppableId="droppableGroupId" direction="horizontal" type="group">
                    {(provided) => (
                        <div className="flex cards"
                        {...provided.droppableProps}
                            ref={provided.innerRef}>

                            {groups.map((group, index) =>
                                <GroupPreview
                                    key={group.id}
                                    id={group.id}
                                    group={group}
                                    index={index}
                                    history={this.props.history} />)}
                            {/* whitespace that stays when we drag something out */}
                            {provided.placeholder}
                        </div>
                    )
                    }
                </Droppable>
                <div className="new-group" >
                    {!this.state.isNewGroupShown &&
                        <div className="add-new-group-text btn"
                            onClick={() => this.setState({ isNewGroupShown: true })}>
                            <span className="material-icons">add</span>Add another list</div>}

                    {this.state.isNewGroupShown &&
                        <AddNewGroup
                            // groupId={groupId}
                            closeNewGroup={this.closeNewGroup} />}
                </div>
            </section>
        )
    }
}