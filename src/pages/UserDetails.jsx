import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ReviewList } from '../cmps/ReviewList'



class _UserDetails extends Component {
        componentDidMount() {
            const { loggedInUser } = this.props
            if (!loggedInUser) this.props.history.push('/login')
        }
        render() {
            const { loggedInUser } = this.props
            if (!loggedInUser) {
                this.props.history.push('/login')
                return ''
            }
            const { fullname, username, _id } = loggedInUser
            const filterBy = !loggedInUser.isAdmin ? { toyId: '', userId: _id } : { toyId: '', userId: '' }
            return (
                <div className="user-details flex column align-center">
                    <h1>User Details</h1>
                    <h2>Fullname: {fullname}</h2>
                    <h2>Username: {username}</h2>
                    <h3>{loggedInUser.isAdmin ? 'All Reviews' : 'My Reviews'}</h3>
                    <ReviewList filterBy={filterBy} />
                </div>
            )
        }
    }

function mapStateToProps(state) {
    return {
        loggedInUser: state.appModule.loggedInUser
    }
}

export const UserDetails = connect(mapStateToProps)(_UserDetails)