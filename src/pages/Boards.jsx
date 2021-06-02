import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadBoard } from '../store/actions/board-actions'
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import Coverflow from 'react-coverflow';
import { StyleRoot } from 'radium';
import AddBoxIcon from '@material-ui/icons/AddBox';

export class _Boards extends Component {

    state = {
        boardClicked: ''
    }

    componentDidMount() {
        console.log('boardspage');
    }


    fn() {
    }


    render() {
        const { board } = this.props

        return (
            <section className="boards-page-bg flex column align-center justify-center">
                <Link to='/board/id' className="tryit">Try It now!</Link>
                <div className="creat-new-board">
                    <span><AddBoxIcon /></span>Create new board
                </div>
                <h1><br />Templates:</h1>
                <br />
                <StyleRoot style={{ background_color: 'red' }}>
                    <Coverflow
                        media={{
                            '@media (max-width: 900px)': {
                                width: '600px',
                                height: '200px'

                            },
                            '@media (min-width: 900px)': {
                                width: '960px',
                                height: '300px'
                            }
                        }}
                        displayQuantityOfSide={2}
                        navigation
                        infiniteScroll
                        enableHeading
                    >
                        <div
                            onClick={() => this.fn()}
                            onKeyDown={() => this.fn()}
                            role="menuitem"
                            tabIndex="0"
                        >
                            <Link to="/board/id">
                                <img
                                    src='http://avante.biz/wp-content/uploads/Tab-HD-Wallpapers/Tab-HD-Wallpapers-007.jpg'
                                    alt='title or description'
                                    onClick={() => this.fn()}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        border: '1px solid red',
                                        borderRadius: '5%',
                                        display: 'flex'

                                    }}
                                />
                            </Link>
                        </div>
                        <Link to="/board/id">

                            <img src='http://avante.biz/wp-content/uploads/Tab-HD-Wallpapers/Tab-HD-Wallpapers-002.jpg'
                                alt='title'
                                onClick={() => this.fn()}
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    border: '1px solid pink',
                                    borderRadius: '5%',
                                }}
                            />
                        </Link>
                        <Link to="/board/id">

                            <img src='http://avante.biz/wp-content/uploads/Tab-HD-Wallpapers/Tab-HD-Wallpapers-016.jpg'
                                onClick={() => this.fn()}
                                alt='title or description'
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    border: '1px solid blue',
                                    borderRadius: '5%',

                                }}
                            />
                        </Link>
                        <Link to="/board/id">

                            <img src='http://avante.biz/wp-content/uploads/Tab-HD-Wallpapers/Tab-HD-Wallpapers-016.jpg'
                                onClick={() => this.fn('id')}
                                alt='title or description'
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    border: '1px solid blue',
                                    borderRadius: '5%',

                                }}
                            />
                        </Link>
                        <Link to="/board/id">

                            <img src='http://avante.biz/wp-content/uploads/Tab-HD-Wallpapers/Tab-HD-Wallpapers-016.jpg'
                                alt='title or description'
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    border: '1px solid blue',
                                    borderRadius: '5%',

                                }}
                            />
                        </Link>


                    </Coverflow>
                </StyleRoot>

            </section>

        )
    }
}

function mapStateToProps(state) {
    return {
        // loggedInUser: state.appModule.loggedInUser
    }
}

const mapDispatchToProps = {
    loadBoard
}

export const Boards = connect(mapStateToProps, mapDispatchToProps)(_Boards)