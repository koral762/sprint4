import React, { Component } from 'react'
import { AddNewGroup } from './AddNewGroup';
import { GroupPreview } from "./GroupPreview";


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

        if (!groups) return <h1>Loading...</h1>
        return (
            <section className="group-list flex full">
                {groups.map(group => <GroupPreview key={group.id} group={group} />)}
                <div className="new-group" >
                    {!this.state.isNewGroupShown && <div className="add-new-group-text btn"
                        onClick={() => this.setState({ isNewGroupShown: true })}><span class="material-icons">
                        add
                        </span>Add another list</div>}
                    {this.state.isNewGroupShown && <AddNewGroup closeNewGroup={this.closeNewGroup} />}
                </div>
            </section>
        )
    }
}