import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadBoards, removeBoard } from '../store/actions/board-actions'
import { Link } from "react-router-dom";
import AddBoxIcon from '@material-ui/icons/AddBox';
import { BoardPreview } from '../cmps/BoardPreview';

export class _Boards extends Component {


    async componentDidMount() {
        await this.props.loadBoards()

    }
    // this.props.removeBoard()

    fn() { }

    render() {
        const { boards } = this.props
        console.log('propx koral', boards);
        return (
            <section className="boards-page-bg flex column ">
                <div className="main-boards">
                    <div className="flex justify-space-between align-center">
                    <h3>Your Boards</h3>
                        <input className="boards-filter" type="text" placeholder="Search...
                        " ></input>
                    </div>

                    <section className="select-board-container">
                        <div className="creat-new-board ">
                        <div className="new-board-text flex align-center">
                            <AddBoxIcon />
                            <p>Create new board</p>
                        </div></div>
                        {boards.map((board) => <BoardPreview key={board._id} board={board} />)}
                    </section>

                    <h3>Popular templates</h3>

                    <section className="select-board-container templates-board-container">
                        <div className="template" style={{
                            backgroundImage: "url(http://avante.biz/wp-content/uploads/Tab-HD-Wallpapers/Tab-HD-Wallpapers-004.jpg)"
                        }}><span>Templet</span></div>
                        <div className="template" style={{
                            backgroundImage: "url(http://avante.biz/wp-content/uploads2/Autumn-City-Wallpapers-for-desktop-1/Autumn-City-Wallpapers-for-desktop-74.jpg)"
                        }}><span>Templet</span></div>
                        <div className="template" style={{
                            backgroundImage: "url(http://avante.biz/wp-content/uploads/Tab-HD-Wallpapers/Tab-HD-Wallpapers-027.jpg)"
                        }}><span>Templet</span></div>
                        <div className="template" style={{
                            backgroundImage: "url(http://avante.biz/wp-content/uploads2/Autumn-City-Wallpapers-for-desktop-1/Autumn-City-Wallpapers-for-desktop-11.jpg)"
                        }}><span>Templet</span></div>
                        <div className="template" style={{
                            backgroundImage: "url(http://avante.biz/wp-content/uploads2/Autumn-City-Wallpapers-for-desktop-1/Autumn-City-Wallpapers-for-desktop-2.jpg)"
                        }}><span>Templet</span></div>
                        <div className="template" style={{
                            backgroundImage: "url(http://avante.biz/wp-content/uploads2/Autumn-City-Wallpapers-for-desktop-1/Autumn-City-Wallpapers-for-desktop-27.jpg)"
                        }}><span>Templet</span></div>
                        <div className="template" style={{
                            backgroundImage: "url(http://avante.biz/wp-content/uploads/Tab-HD-Wallpapers/Tab-HD-Wallpapers-059.jpg)"
                        }}><span>Templet</span></div>
                    </section>

                </div>



            </section>
        )

    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards
        // loggedInUser: state.appModule.loggedInUser
    }
}

const mapDispatchToProps = {
    loadBoards,
    removeBoard
}

export const Boards = connect(mapStateToProps, mapDispatchToProps)(_Boards)