import React, { Component } from 'react'
import SubjectIcon from '@material-ui/icons/Subject';

export class CardDescription extends Component {

    state = {
        description: '',
        isEditing: false
    }


    componentDidMount() {
        this.setDescriptionFromProps()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.description !== this.props.description) {
            this.setDescriptionFromProps()
        }
    }

    setDescriptionFromProps = () => {
        let description = this.props.description
        if (!description) description = ''
        this.setState({ description })
    }

    onChange = (ev) => {
        const description = ev.target.value
        this.setState({ description })
    }

    setEditing = () => {
        this.setState({ isEditing: true })
    }

    setNotEditing = () => {
        this.setState({ isEditing: false })
    }

    onSave = () => {
        this.props.onUpdateDesc(this.state.description)
        this.setNotEditing()
    }

    getDescriptionTxt = () => {
        if (!this.state.description) return 'Add a more detailed description…'
        return this.state.description
    }

    getIsEditing = () => {
        if (!this.state.isEditing) return (
            <pre onClick={this.setEditing}>{this.getDescriptionTxt()}</pre>
        )
        return (
            <div>
                <textarea value={this.state.description} autoFocus onChange={this.onChange} onBlur={this.onSave} placeholder="Enter a more details description here..." />
                <button onClick={this.onSave} className="btn">Save</button>
            </div>
        )
    }

    // 
    render() {
        // if (!this.state.isReady) return <div>Loading...</div>
        return (
            <div>
                {/* <input value={this.state.description} onChange={this.onChange} placeholder="Enter a more details description here..." /> */}
                <div>
                <h3>Description</h3>
                {this.getIsEditing()}
                </div>
            </div>
        )
    }
}