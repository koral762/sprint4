import React, { Component } from 'react'
import { connect } from 'react-redux';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import CloseIcon from '@material-ui/icons/Close';
import { ChangeBackground } from './ChangeBackground.jsx';

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
                return <ChangeBackground/>

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
                    <button className="close-side-bar" onClick={() => { this.titleClicked('Menu') }}><NavigateBeforeIcon /></button>}
                    <h3 className="menu-title">{this.state.sideBarTitle}</h3>
                    <button className="close-side-bar" onClick={() => { this.props.onToggleSidebar(false) }}><CloseIcon /></button>
                </div>
                <hr class="side-menu-divider" />
                <div className="side-bar-inside-container">
                    {this.state.sideBarTitle === 'Menu' &&
                        <ul className="side-menu-list clean-list">
                            <li onClick={() => { this.titleClicked('About this board') }}>About this board</li>
                            <li onClick={() => { this.titleClicked('Change background') }}>Change background</li>
                            <li onClick={() => { this.titleClicked('Board analysis') }}>Board analysis</li>
                        </ul>
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