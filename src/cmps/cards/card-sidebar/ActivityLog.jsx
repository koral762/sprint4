import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';
import { MemberPreview } from '../../BoardHeader/MemberPreview';

export function ActivityLog({ boardId, displayMode, activities }) {
    if (!activities) return <div><CircularProgress /></div>;
    if (activities && activities.length > 15) activities = activities.slice(0, 14);



    return (
        <ul className="activity-list clean-list">
            {activities.map(activity => {
                const byMember = activity.byMember

                return <li className="whole-activity flex align-center" key={activity.id}>
                    {console.log(byMember)}
                    {(displayMode !== 'user') ? <MemberPreview name={(byMember && byMember.fullName) ? byMember.fullName : "Guest"} imgUrl={byMember ? byMember.imgUrl : ""} /> : <React.Fragment />}
                    <pre className="activity-details">
                        <div className="flex activity-text-box-text">
                            {(displayMode === 'user') ? <React.Fragment /> : (boardId) ? (<Link to={`/board/${boardId}`}>{byMember.fullName ? byMember.fullName : "Guest" + " "}</Link>) : `${byMember.fullName ? byMember.fullName : 'Guest'} `}
                            <span>{activity.commentTxt ? 'commented:' : '' + activity.txt}</span>
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
                        <span>{timeago.format(activity.createdAt)}</span>
                    </pre>
                </li>
            })}
        </ul>
    )
}
