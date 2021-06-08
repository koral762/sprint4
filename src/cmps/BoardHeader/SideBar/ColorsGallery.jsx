import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setStyle, updateBoard } from '../../../store/actions/board-actions.js'


export class _ColorsGallery extends Component {

    state = {
        colorSelected: ''
    }


    colorSelected = (colorSelected) => {
        if (this.state.colorSelected === colorSelected) return;
        this.setState({ colorSelected })
        const { board } = this.props;
        board.style.bgImg = null;
        board.style.boardColor = colorSelected;
        this.props.style.bgImg = null;
        this.props.style.boardColor = colorSelected;
        this.props.updateBoard(board)
    }

    render() {

        const colors = [
            "rgb(0, 121, 191)",
            "rgb(210, 144, 52)",
            "rgb(81, 152, 57)",
            "rgb(176, 70, 50)",
            "rgb(137, 96, 158)",
            "rgb(205, 90, 145)",
            "rgb(75, 191, 107)",
            "rgb(0, 174, 204)",
            "rgb(131, 140, 145)"
        ]

        return (

            <section className="image-gallery">

                {colors.map((color) => <div className="image" onClick={() => { this.colorSelected(color) }} style={{ backgroundColor: color }}></div>)}

            </section>
        )

    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
        style: state.boardModule.style
    };
};

const mapDispatchToProps = {
    setStyle,
    updateBoard
};

export const ColorsGallery = connect(mapStateToProps, mapDispatchToProps)(_ColorsGallery);

