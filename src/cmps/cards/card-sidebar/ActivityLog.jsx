import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
// import * as timeago from 'timeago.js';
// import { MemberPreview } from '../BoardHeader/MemberPreview';

export function ActivityLog({ boardId, displayMode, activities }) {
    if (!activities) return <div><CircularProgress /></div>;
    if (activities && activities.length > 15) activities = activities.slice(0, 14);
    
    return (
        <ul className="activity-text-box clean-list">
            {activities.map(activity => {
                return <li key={activity.id}>
                    {/* {(displayMode !== 'user') ? <MemberPreview name={activity.byMember.fullName} imgUrl={activity.byMember.imgUrl} /> : <React.Fragment />} */}
                    <pre>
                        <div className="flex">
                            {/* {(displayMode==='user') ? <React.Fragment /> : (boardId) ? (<Link to={`/board/${boardId}`}>{activity.byMember.fullName + ' '}</Link>) : `${activity.byMember.fullName} `} */}
                            <span>{activity.commentTxt ? 'commented:' : activity.txt + ' '}</span>
                            {activity.commentTxt && <div>
                                {activity.commentTxt}
                            </div>}
                            {displayMode !== 'card' && <span>
                                {'in '}
                                {(boardId) ? <Link to={`/board/${boardId}/${activity.card.id}/`}>
                                    {activity.card.title}
                                </Link> : `${activity.card.title}`}
                            </span>}
                        </div>
                        {/* <span>{timeago.format(activity.createdAt)}</span> */}
                    </pre>
                </li>
            })}
        </ul>
    )
}
