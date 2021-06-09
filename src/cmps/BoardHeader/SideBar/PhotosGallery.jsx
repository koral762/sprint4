import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setStyle, updateBoard } from '../../../store/actions/board-actions.js'


export class _PhotosGallery extends Component {

    state = {
        imgSelected: ''
    }


    imgSelected = (imgSelected) => {
        if (this.state.imgSelected === imgSelected) return;
        this.setState({ imgSelected })
        const { board } = this.props;
        board.style.bgImg = imgSelected;
        this.props.style.bgImg = imgSelected;
        this.props.updateBoard(board)
    }

    render() {

        const imgs = [
            "url(http://avante.biz/wp-content/uploads/Tab-HD-Wallpapers/Tab-HD-Wallpapers-001.jpg)",
            "url(http://avante.biz/wp-content/uploads/Wonderful-Desktop-Wallpapers/Wonderful-Desktop-Wallpapers-005.jpg",
            "url(http://avante.biz/wp-content/uploads/Wonderful-Desktop-Wallpapers/Wonderful-Desktop-Wallpapers-014.jpg)",
            "url(http://avante.biz/wp-content/uploads2/Summer-Nature-Desktop-HD-1/Summer-Nature-Desktop-HD-8.jpg)",
            "url(http://avante.biz/wp-content/uploads2/Summer-Nature-Desktop-HD-1/Summer-Nature-Desktop-HD-1.jpg)",
            "url(http://avante.biz/wp-content/uploads/Wonderful-Desktop-Wallpapers/Wonderful-Desktop-Wallpapers-033.jpg)",
            "url(http://avante.biz/wp-content/uploads/Wonderful-Desktop-Wallpapers/Wonderful-Desktop-Wallpapers-010.jpg)",
            "url(http://avante.biz/wp-content/uploads2/Summer-Nature-Desktop-HD-1/Summer-Nature-Desktop-HD-6.jpg)",
            "url(http://avante.biz/wp-content/uploads/Wonderful-Desktop-Wallpapers/Wonderful-Desktop-Wallpapers-032.jpg)",
            "url(http://avante.biz/wp-content/uploads/Outer-space-wallpaper-for-mac/Outer-space-wallpaper-for-mac15.jpg)",
            "url(http://avante.biz/wp-content/uploads/Outer-space-wallpaper-for-mac/Outer-space-wallpaper-for-mac13.jpg)",
            "url(http://avante.biz/wp-content/uploads2/Autumn-Street-Wallpapers-Desktop-1/Autumn-Street-Wallpapers-Desktop-45.jpg)"
        ]


        return (

            <section className="image-gallery">

                {imgs.map((img) => <div className="image" onClick={() => { this.imgSelected(img) }} key={img} style={{ backgroundImage: img }}></div>)}

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

export const PhotosGallery = connect(mapStateToProps, mapDispatchToProps)(_PhotosGallery);

