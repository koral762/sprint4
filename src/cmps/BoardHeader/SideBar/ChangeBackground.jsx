import React, { Component } from 'react'
import { connect } from 'react-redux'


export class _ChangeBackground extends Component {

    state = {
        chooseBackground:''
    }


    render() {

        return (
            <section className="change-background-container">

                <div className="change-background-container">change background</div>
                <hr />
                <div className="board-backgrounds-section-tile board-backgrounds-photos-tile">
                    <div className="image"></div>
                    <div className="title">Photos</div>
                </div>
                <div className="board-backgrounds-section-tile board-backgrounds-colors-tile">
                    <div className="image"></div>
                    <div className="title">Colors</div>
                </div>
            </section>

        )
    }

}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard
    };
};

const mapDispatchToProps = {

};

export const ChangeBackground = connect(mapStateToProps, mapDispatchToProps)(_ChangeBackground);
