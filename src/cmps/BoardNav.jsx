import React, { Component } from 'react'
import { connect } from 'react-redux'


class _BoardNav extends Component {

    //     state = {
    //         userImgStyle: {
    //             backgroundImage: "url(https://res.cloudinary.com/ddgevj2yp/image/upload/v1610989052/avatar-1_kbr5un.jpg"
    //         }
    //     }

    componentDidMount() {
        if (!this.props.loggedInUser) return
        const userImgUrl = this.props.loggedInUser.imgUrl
        let userImgStyle = {
            backgroundImage: `url(${userImgUrl})`
        }
        this.setState({ userImgStyle })
    }



    render() {
        const { selectedBoard, toggleSideMenu } = this.props
        return (
            <div>
                <nav>
                    {/* <h5>{selectedBoard.title}</h5> */}
                    title of board here
                </nav>
                <nav>
                    {/* <span style={this.state.userImgStyle}></span> */}
                    pics of board member here
                </nav>
                <nav>
                    <button onClick={toggleSideMenu}> Activities Menu</button>
                </nav>

            </div>
        )

    }
}


const mapStateToProps = state => {
    return {
        // selectedBoard: state.boardModule.selectedBoard,
        // loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {

}

export const BoardNav = connect(mapStateToProps, mapDispatchToProps)(_BoardNav)
