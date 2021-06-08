import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ColorsGallery } from './ColorsGallery'
import { PhotosGallery } from './PhotosGallery'



export class _ChangeBackground extends Component {

    state = {
        chooseBackground: ''
    }

    onSelect = (chooseBackground) => {
        this.setState({ chooseBackground })
        console.log(chooseBackground);
    }

    render() {

        return (
            <section className="change-background-container">
                <hr className="side-menu-divider" />

                {this.state.chooseBackground === '' &&
                    <div className="change-backgrounds-inier-container">
                        <div className="board-backgrounds-section-tile board-backgrounds-photos-tile" onClick={() => { this.onSelect('Photos') }}>
                            <div className="image"></div>
                            <div className="title">Photos</div>
                        </div>
                        <div className="board-backgrounds-section-tile board-backgrounds-colors-tile" onClick={() => { this.onSelect('Colors') }}>
                            <div className="image"></div>
                            <div className="title">Colors</div>
                        </div>
                    </div>
                }

                {this.state.chooseBackground === 'Photos' && <PhotosGallery />}
                {this.state.chooseBackground === 'Colors' && <ColorsGallery />}

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
