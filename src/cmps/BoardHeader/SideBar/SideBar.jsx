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
            <div className="side-bar-container" >

                {console.log('side bar innn')}
                <div className="side-bar-header">
                    {this.state.sideBarTitle !== 'Menu' &&
                        <button className="close-side-bar" onClick={() => { this.titleClicked('Menu') }}><NavigateBeforeIcon /></button>}
                    <div className="menu-title">{this.state.sideBarTitle}</div>
                    <button className="close-side-bar" onClick={() => { this.props.onToggleSidebar(false) }}><CloseIcon /></button>
                </div>
                <hr/>
                <div className="side-bar-inside-containr">

                    {this.state.sideBarTitle === 'Menu' &&
                        <section className="side-bar-selection">
                            <div onClick={() => { this.titleClicked('About this board') }}>About this board</div>
                            <div onClick={() => { this.titleClicked('Change background') }}>Change background</div>
                            <div onClick={() => { this.titleClicked('Board analysis') }}>Board analysis</div>
                        </section>
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