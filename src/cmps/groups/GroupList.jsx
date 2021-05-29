import React, { Component } from 'react'
import { AddNewGroup } from './AddNewGroup';
import { GroupPreview } from "./GroupPreview";
import {DragDropContext,Draggable} from "react-beautiful-dnd";


export class GroupList extends Component {
    state = {
        isNewGroupShown: false,
        groups: null
    }

    closeNewGroup = () => {
        this.setState({ isNewGroupShown: false })
    }

    render() {
        const { groups, onAddGroup } = this.props

        if (!groups) return <h1>loading...</h1>
        return (
            <section className="group-list flex">
                {groups.map(group => <GroupPreview key={group.id} group={group} />)}
                <div className="new-group" >
                    {!this.state.isNewGroupShown && <div className="add-new-group-text" style={{ cursor: 'pointer',border: '1px solid'}}
                        onClick={() => this.setState({ isNewGroupShown: true })}>+ Add another list</div>}
                    {this.state.isNewGroupShown && <AddNewGroup closeNewGroup={this.closeNewGroup} />}
                </div>
            </section>
        )
    }
}