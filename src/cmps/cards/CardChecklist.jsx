import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress } from '@material-ui/core'
import React, { Component } from 'react'
import { CardChecklistTodo } from './CardChecklistTodo'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
export class CardChecklist extends Component {

    state = {
        displayCompleted: true,
        showDialog: false,
        tasksCompleted: 0,
        totalTasks: 0
    }

    componentDidMount() {
        this.setTasksStatus()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.checklist !== prevProps.checklist) this.setTasksStatus()
    }

    setTasksStatus = () => {
        let tasksCompleted = 0
        let totalTasks = 0

        this.props.checklist.todos.forEach(todo => {
            if (todo.isDone) tasksCompleted += 1
            totalTasks += 1
        });

        this.setState({ tasksCompleted, totalTasks })
    }

    toggleDisplayCompleted = () => {
        if (this.state.displayCompleted) return this.setState({ displayCompleted: false })
        return this.setState({ displayCompleted: true })
    }

    getDisplayCheckedBtn = () => {
        if (!this.state.tasksCompleted) return <React.Fragment />
        let btnContent;
        if (this.state.displayCompleted) {
            btnContent = 'Hide Completed Items'
        } else {
            btnContent = `Show Checked Items (${this.state.tasksCompleted})`
        }

        return (
            <button onClick={this.toggleDisplayCompleted}>{btnContent}</button>
        )
    }

    onRemoveChecklist = async () => {
        const checklist = { ...this.props.checklist }
        checklist.title = ''
        let activityTxt = `removed ${this.props.checklist.title}`
        this.props.onUpdate(checklist, activityTxt)
        this.closeDialog()

    }


    openDialog = () => {
        this.setState({ showDialog: true })
    }

    closeDialog = () => {
        this.setState({ showDialog: false })
    }

    getTotalTasks = (checklist) => {
        return checklist.todos.length
    }

    getCompletedTasks = (checklist) => {
        return checklist.todos.filter(checklistItem => checklistItem.isDone).length
    }

    getPercentCompleted = (checklist) => {
        if (this.getTotalTasks(checklist) == 0) return 100
        const percent = Math.round((this.getCompletedTasks(checklist) / this.getTotalTasks(checklist)) * 100)
        return percent
    }

    onUpdateChecklist = (newTodo, activityTxt) => {
        // take the updated todo and insert it into the list
        let todos = [...this.props.checklist.todos]
        // find the todo index
        const todoIdx = todos.findIndex(todo => todo.id === newTodo.id)
        // if new title is blank - remove todo
        if (!newTodo.title) {
            todos.splice(todoIdx, 1)
        } else if (todoIdx < 0) { //if the index is less than 0 - this is a new item
            todos.push(newTodo)
        } else {
            todos[todoIdx] = newTodo
        }
        const checklist = { ...this.props.checklist }
        checklist.todos = todos
        this.props.onUpdate(checklist, activityTxt)
    }

    render() {
        return (
            <div>
                <div className="flex justify-space-between">
                    <div className="flex">
                        <CheckBoxOutlinedIcon />
                        <h3>{this.props.checklist.title}</h3>
                    </div>
                    <div>
                        {this.getDisplayCheckedBtn()}
                        <button className="checklist-delete-button" onClick={this.openDialog}>Delete</button>
                    </div>
                </div>
                <div>
                    <div>%{this.getPercentCompleted(this.props.checklist)}</div>
                    <LinearProgress value={this.getPercentCompleted(this.props.checklist)} variant="determinate" />
                </div>
                <main>
                    {this.props.checklist.todos.map(todo => <CardChecklistTodo key={todo.id} displayCompleted={this.state.displayCompleted} todo={todo} onUpdate={this.onUpdateChecklist} />)}
                    <CardChecklistTodo isNew={true} onUpdate={this.onUpdateChecklist} />
                </main>
                <Dialog onClose={this.closeDialog} open={this.state.showDialog}>
                    <DialogTitle id="alert-dialog-title">{"Remove this checklist?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Deleting a checklist is permanent.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDialog} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.onRemoveChecklist} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}