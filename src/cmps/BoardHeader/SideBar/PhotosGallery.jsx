import React, { Component } from 'react'
import { connect } from 'react-redux'

export class _PhotosGallery extends Component {

    state = {
        imgSelected: ''
    }


    imgSelected = (imgSelected) => {
        this.setState({imgSelected})
        console.log(imgSelected);
    }

    render() {


        return (
            <section className="image-gallery">

                <div className="image" onClick={() => { this.imgSelected('1') }} style={{backgroundImage:"url(http://avante.biz/wp-content/uploads/Tab-HD-Wallpapers/Tab-HD-Wallpapers-001.jpg)"}}></div>
                <div className="image" onClick={() => { this.imgSelected('2') }} style={{backgroundImage:"url(http://avante.biz/wp-content/uploads/Wonderful-Desktop-Wallpapers/Wonderful-Desktop-Wallpapers-008.jpg)"}}></div>
                <div className="image" onClick={() => { this.imgSelected('2') }} style={{backgroundImage:"url(http://avante.biz/wp-content/uploads/Wonderful-Desktop-Wallpapers/Wonderful-Desktop-Wallpapers-033.jpg)"}}></div>
                <div className="image" onClick={() => { this.imgSelected('3') }} style={{backgroundImage:"url(http://avante.biz/wp-content/uploads/Wonderful-Desktop-Wallpapers/Wonderful-Desktop-Wallpapers-005.jpg)"}}></div>
                <div className="image" onClick={() => { this.imgSelected('3') }} style={{backgroundImage:"url(http://avante.biz/wp-content/uploads/Wonderful-Desktop-Wallpapers/Wonderful-Desktop-Wallpapers-032.jpg)"}}></div>
                <div className="image" onClick={() => { this.imgSelected('4') }} style={{backgroundImage:"url(http://avante.biz/wp-content/uploads/Wonderful-Desktop-Wallpapers/Wonderful-Desktop-Wallpapers-003.jpg)"}}></div>
                <div className="image" onClick={() => { this.imgSelected('5') }} style={{backgroundImage:"url(http://avante.biz/wp-content/uploads/Outer-space-wallpaper-for-mac/Outer-space-wallpaper-for-mac15.jpg)"}}></div>
                <div className="image" onClick={() => { this.imgSelected('6') }} style={{backgroundImage:"url(http://avante.biz/wp-content/uploads/Outer-space-wallpaper-for-mac/Outer-space-wallpaper-for-mac13.jpg)"}}></div>
                <div className="image" onClick={() => { this.imgSelected('7') }} style={{backgroundImage:"url(http://avante.biz/wp-content/uploads/Wonderful-Desktop-Wallpapers/Wonderful-Desktop-Wallpapers-010.jpg)"}}></div>
                <div className="image" onClick={() => { this.imgSelected('8') }} style={{backgroundImage:"url(http://avante.biz/wp-content/uploads/Wonderful-Desktop-Wallpapers/Wonderful-Desktop-Wallpapers-014.jpg)"}}></div>
                <div className="image" onClick={() => { this.imgSelected('9') }} style={{backgroundImage:"url(http://avante.biz/wp-content/uploads/THC-structure-wallpaper/THC-structure-wallpaper1.jpg)"}}></div>
               
                

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

export const PhotosGallery = connect(mapStateToProps, mapDispatchToProps)(_PhotosGallery);

