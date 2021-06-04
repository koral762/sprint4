
import React from 'react'
import { Link } from "react-router-dom";

// import { MemberPreview } from '../BoardHeader/MemberPreview'
// import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';


export function BoardPreview(props) {

    const board = props.board
    const boardImg = props.board.style.bgImg
    console.log(boardImg);

    return (
        
        <Link to={`/board/${board._id}`}>
            <div className="board" style={{backgroundImage:`${boardImg}`}}><span>{board.title}</span></div>
        </Link>
    )
}


