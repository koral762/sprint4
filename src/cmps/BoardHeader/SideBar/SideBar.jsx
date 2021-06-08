import React, { Component } from 'react'
import { connect } from 'react-redux';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import CloseIcon from '@material-ui/icons/Close';
import { ChangeBackground } from './ChangeBackground.jsx';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import InfoIcon from '@material-ui/icons/Info';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import AssessmentIcon from '@material-ui/icons/Assessment';

export class _SideBar extends Component {

    state = {
        sideBarTitle: ''
    }

    async componentDidMount() {
        // await this.props.loadAllUsers()
        this.setState({ sideBarTitle: 'Menu' })
    }

    titleClicked = (title) => {
        this.setState({ sideBarTitle: title })
    }

    DynamicCmp = () => {

        const { sideBarTitle } = this.state;

        switch (sideBarTitle) {
            case 'Change background':
                return <ChangeBackground />

            case null:
                return <React.Fragment></React.Fragment>
            default:
                return <React.Fragment></React.Fragment>
        }

    }

    render() {
        return (
            <div className="side-bar-container flex column align-center" >
                {console.log('side bar in')}
                <div className="side-bar-header flex align-center">
                    {this.state.sideBarTitle !== 'Menu' &&
                        <button className="Navigat-side-bar" onClick={() => { this.titleClicked('Menu') }}><NavigateBeforeIcon /></button>}
                    <h3 className="menu-title">{this.state.sideBarTitle}</h3>
                    <button className="close-side-bar" onClick={() => { this.props.onToggleSidebar(false) }}><CloseIcon /></button>
                </div>
                <div className="side-bar-inside-container">
                    {this.state.sideBarTitle === 'Menu' &&

                        <div className="side-bar-inside-menu-container">
                            <hr className="side-menu-divider" />
                            <ul className="side-menu-list clean-list">
                                <li onClick={() => { this.titleClicked('About this board') }}><span><InfoIcon/></span>About this board</li>
                                <li onClick={() => { this.titleClicked('Change background') }}><span><WallpaperIcon/></span>Change background</li>
                                <li onClick={() => { this.titleClicked('Board analysis') }}><span><AssessmentIcon/></span>Board analysis</li>
                            </ul>
                            <hr className="side-menu-divider" />
                        </div>
                    }
                    {this.DynamicCmp()}

                </div>
            </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
        allUsers: state.userModule.users
    };
};
const mapDispatchToProps = {

};
export const SideBar = connect(mapStateToProps, mapDispatchToProps)(_SideBar);