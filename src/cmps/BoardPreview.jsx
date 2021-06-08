import React from 'react'
import { Link } from "react-router-dom";

// import { MemberPreview } from '../BoardHeader/MemberPreview'
// import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

//add class templateto inside div?
export function BoardPreview(props) {

    const board = props.board
    const boardImg = props.board.style.bgImg
    const boardColor = props.board.style.boardColor

    return (

        <Link to={`/board/${board._id}`}>
            <div className="template" style={boardImg ? { backgroundImage: boardImg } :
                { backgroundColor: boardColor }}>
                <span className="board-title-preview">{board.title}</span></div>
        </Link>
    )
}


