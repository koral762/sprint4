import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadBoard } from '../../store/actions/board-actions';

class _CardDetails extends Component {
    
    /*
    {
          "id": "XHygDINBkE",
          "title": "Broccoli",
          "description": "",
          "archivedAt": null,
          "members": [
            
          ],
          "labels": [
            {
              "id": "l101"
            }
          ],
          "createdAt": 1601366855608,
          "dueDate": null,
          "attachments": null,
          "timeAnalysis": {
            "timeInGroupsMap": {
              
            },
            "currGroup": {
              "groupId": "yS0BIH6hb0",
              "enteredAt": 1601366855608
            }
          },
          "byMember": {
            
          }
        }
    */
    state = {
        card: null,
        groupId: null,
        groupName: null
    }

    componentDidMount() {      
        console.log('Did mount boardId: ' + this.props.boardId + ' cardId' + this.props.cardId)
        if (this.props.boardId && this.props.cardId) {
            this.props.loadBoard(this.props.boardId).then(() => {
                console.log('After then')
                this.getCardDetails()
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cardId !== this.props.cardId) {
            this.getCardDetails()
        }
    }

    getCardDetails = () => {
        console.log('Get card details ' + this.props.cardId)
        let foundCard = false;
        this.props.board.groups.forEach(group => {
            group.cards.forEach(card => {
                if (card.id === this.props.cardId) {
                    const groupId = group.id
                    const groupName = group.title
                    foundCard = true
                    console.log('Found card ' + this.props.cardId)
                    this.setState({ groupId, groupName, card })
                    return
                }
            })
        })

        if (!foundCard) {
            console.log('Could not find card')
        }
    }

    onCloseCard = () => {
        this.props.history.push(`/board/${this.props.boardId}`)
    }

    render() {
        if (!this.state.card){
            return <div>Loading...</div>
        }
        return (
            <div className="card-details">
                <div>{this.state.card.title}</div>
                <div>{this.state.card.description}</div>
                <div>
                    <div></div>
                    <div></div>
                </div>
                <div></div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard
    };
};

const mapDispatchToProps = {
    loadBoard
};

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails);
