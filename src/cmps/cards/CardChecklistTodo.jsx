import { Button, Checkbox } from '@material-ui/core'
import React, { Component } from 'react'
import { utils } from '../../services/utils-service'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import AddIcon from '@material-ui/icons/Add'

export class CardChecklistTodo extends Component {

    state = {
        isDone: false,
        isEditing: false,
        txtValue: '',
        isNew: false
    }

    setEditing = () => {
        this.setState({ isEditing: true })
    }
    setNotEditing = () => {
        this.setState({ isEditing: false })
    }

    removeText = () => {
        this.setState({ txtValue: '' })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.title !== this.props.title || prevProps.isDone !== this.props.isDone) this.updateTodo()
    }

    componentDidMount() {
        if (this.props.isNew) this.setState({ isNew: true })
        this.updateTodo()
    }

    getNewTodoDisplay = () => {
        if (this.state.isEditing) {
            return (
                <form onBlur={this.setNotEditing} onSubmit={this.onSubmit}>
                    <input className="checkbox-text-edit" type="text" autoFocus value={this.state.txtValue} onChange={this.onChange} />
                </form>
            )
        }
        return (
            <button className="flex checklist-add-todo" onClick={this.setEditing}>
                <AddIcon className="add-icon" />
                Add an item
            </button>
        )
    }

    getTodoClassName = () => {
        const doneClass = (this.state.isDone) ? 'todo-done' : 'todo-not-done'
        return `flex justify-space-between checklist-todo-title ${doneClass}`
    }
    getTextBox = () => {
        if (this.state.isEditing) return (
            <React.Fragment>
                <form onBlur={this.setNotEditing} onSubmit={this.onSubmit}>
                    <Checkbox checked={this.state.isDone} onChange={this.onCheck} className="checkbox-todo" />
                    <input className="checkbox-text-edit" type="text" autoFocus value={this.state.txtValue} onChange={this.onChange} />
                    <button className="save-btn" type="submit">Save</button>
                </form>
            </React.Fragment>
        )
        return (
            <React.Fragment>
                <div className={this.getTodoClassName()} onClick={this.setEditing}>
                    <div>
                        <Checkbox checked={this.state.isDone} onChange={this.onCheck} className="checkbox-todo" />
                        {this.state.txtValue}
                    </div>
                    <Button onClick={this.onRemove}>
                        <DeleteOutlineOutlinedIcon className="trash-bin-icon" />
                    </Button>
                </div>
            </React.Fragment>
        )
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        this.updateChecklist()
    }

    updateTodo = () => {

        const todo = this.props.todo
        if (!todo) return
        const txtValue = todo.title
        const isDone = todo.isDone

        this.setState({ isDone, txtValue })
    }

    onChange = (ev) => {

        this.setState({ txtValue: ev.target.value })
    }

    onCheck = (ev) => {
        let checkStatus = ev.target.checked
        this.setState({ isDone: checkStatus }, () => {
            this.updateChecklist()
        })
    }

    getActivityTxt = () => {
        let txt;
        if (this.state.isDone) {
            txt = `completed ${this.state.txtValue}`
        } else {
            txt = `marked ${this.state.txtValue} incomplete`
        }
        return txt
    }
    onRemove = (ev) => {
        ev.stopPropagation()
        this.setState({ txtValue: '' }, this.updateChecklist)
    }

    updateChecklist = () => {
        let id;
        if (this.props.todo) {
            id = this.props.todo.id
        } else {
            id = utils.makeId()
        }
        const todo = {
            id,
            isDone: this.state.isDone,
            title: this.state.txtValue
        }

        const activityTxt = this.getActivityTxt()
        if (this.state.isNew) {
            this.props.onUpdate(todo)
            this.setState({ txtValue: '' })
        } else {
            this.props.onUpdate(todo, activityTxt)
        }
    }

    render() {
        if (!this.props.displayCompleted && this.state.isDone) return <React.Fragment />
        return (
            <div className="checklist-todo">
                {(this.state.isNew) ? this.getNewTodoDisplay() : this.getTextBox()}
            </div>
        )
    }
}