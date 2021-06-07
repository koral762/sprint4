import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setStyle,updateBoard } from '../../../store/actions/board-actions.js'


export class _PhotosGallery extends Component {

    state = {
        imgSelected: ''
    }


    imgSelected = (imgSelected) => {
        if(this.state.imgSelected === imgSelected) return;
        this.setState({imgSelected})
        const {board}=this.props;
        board.style.bgImg=imgSelected;
        this.props.style.bgImg=imgSelected;
        this.props.updateBoard(board)
    }

    render() {

        const bgUrl1="url(http://avante.biz/wp-content/uploads/Tab-HD-Wallpapers/Tab-HD-Wallpapers-001.jpg)";
        const bgUrl2="url(http://avante.biz/wp-content/uploads/Wonderful-Desktop-Wallpapers/Wonderful-Desktop-Wallpapers-008.jpg)";
        const bgUrl3="url(http://avante.biz/wp-content/uploads/Wonderful-Desktop-Wallpapers/Wonderful-Desktop-Wallpapers-033.jpg)";
        const bgUrl4="url(http://avante.biz/wp-content/uploads/THC-structure-wallpaper/THC-structure-wallpaper1.jpg)";
        const bgUrl5="url(http://avante.biz/wp-content/uploads/Wonderful-Desktop-Wallpapers/Wonderful-Desktop-Wallpapers-005.jpg";
        const bgUrl6="url(http://avante.biz/wp-content/uploads/Wonderful-Desktop-Wallpapers/Wonderful-Desktop-Wallpapers-032.jpg)";
        const bgUrl7="url(http://avante.biz/wp-content/uploads/Outer-space-wallpaper-for-mac/Outer-space-wallpaper-for-mac15.jpg)";
        const bgUrl8="url(http://avante.biz/wp-content/uploads/Outer-space-wallpaper-for-mac/Outer-space-wallpaper-for-mac13.jpg)";
        const bgUrl9="url(http://avante.biz/wp-content/uploads/Wonderful-Desktop-Wallpapers/Wonderful-Desktop-Wallpapers-010.jpg)";
        const bgUrl10="url(http://avante.biz/wp-content/uploads/Wonderful-Desktop-Wallpapers/Wonderful-Desktop-Wallpapers-014.jpg)";
    

        return (
    
            <section className="image-gallery">
                
                <div className="image" onClick={() => { this.imgSelected(bgUrl1) }} style={{backgroundImage:bgUrl1}}></div>
                <div className="image" onClick={() => { this.imgSelected(bgUrl2) }} style={{backgroundImage:bgUrl2}}></div>
                <div className="image" onClick={() => { this.imgSelected(bgUrl3) }} style={{backgroundImage:bgUrl3}}></div>
                <div className="image" onClick={() => { this.imgSelected(bgUrl4) }} style={{backgroundImage:bgUrl4}}></div>
                <div className="image" onClick={() => { this.imgSelected(bgUrl5) }} style={{backgroundImage:bgUrl5}}></div>
                <div className="image" onClick={() => { this.imgSelected(bgUrl6) }} style={{backgroundImage:bgUrl6}}></div>
                <div className="image" onClick={() => { this.imgSelected(bgUrl7) }} style={{backgroundImage:bgUrl7}}></div>
                <div className="image" onClick={() => { this.imgSelected(bgUrl8) }} style={{backgroundImage:bgUrl8}}></div>
                <div className="image" onClick={() => { this.imgSelected(bgUrl9) }} style={{backgroundImage:bgUrl9}}></div>
                <div className="image" onClick={() => { this.imgSelected(bgUrl10) }} style={{backgroundImage:bgUrl10}}></div>
        
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

