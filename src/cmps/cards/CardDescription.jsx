import React, { Component } from 'react'
import SubjectIcon from '@material-ui/icons/Subject'
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

    //description-text-box

    getIsEditing = () => {
        if (!this.state.isEditing) return (
            <pre className="description-text-box" onClick={this.setEditing}>{this.getDescriptionTxt()}</pre>
        )
        return (
            <div className="description-active-box flex column">
                <textarea value={this.state.description} autoFocus onChange={this.onChange}
                    onBlur={this.onSave} placeholder="Enter a more detailed description here..."
                    className="modal-desc-textarea" />
                <button onClick={this.onSave}>Save</button>
            </div>
        )
    }

    // 
    render() {
        // if (!this.state.isReady) return <div>Loading...</div>
        return (
            <div className="modal-description flex">
                <SubjectIcon />
                <div className="description-txt flex column">
                    <h3 className="description-title">Description</h3>
                    {this.getIsEditing()}
                </div>
            </div>
        )
    }
}
