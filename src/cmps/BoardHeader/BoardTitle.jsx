import React, { Component } from 'react'

export class BoardTitle extends Component {

    state = {
        txt: '',
        isEditing: false
    }

    componentDidMount() {
        const txt=this.props.titleTxt
        this.setState({txt})
    }

    componentDidUpdate(prevProps, prevState) { 
        if (prevProps.titleTxt != this.props.titleTxt) {
            this.setState({txt: this.props.titleTxt})
        }
    }

    onChangeText = (ev) => {
        const txt = ev.target.value
        this.setState({txt})
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        if (!this.state.txt) return
        this.setNotEditing()
        this.props.onUpdate(this.state.txt)
        
    }

    setEditing = () => {
        this.setState({ isEditing: true })
    }

    setNotEditing = () => {
        this.setState({ isEditing: false })
    }

    getIsEditing = () => {
        if (this.state.isEditing) return (
            <form onBlur={this.setNotEditing} onSubmit={this.onSubmit}>
                <input name="header" type="text" autoFocus value={this.state.txt} onChange={this.onChangeText}/>
            </form>
        )
        return <div onClick={this.setEditing}><h2 className="proj-title btn">{this.state.txt}</h2></div>
    }

    render() {
        return (
            <div>
                {this.getIsEditing()}
            </div>
        )
    }
}