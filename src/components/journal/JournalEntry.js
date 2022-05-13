import React from 'react'
import moment from 'moment'
import { useDispatch } from "react-redux";
import { setActiveNote } from '../../actions/notes';

export const JournalEntry = ({id, title, body, imageUrl, date}) => {
    const noteDate = moment(date);
    const dispatch = useDispatch();
    const handleEntryClick = () => {
        imageUrl ? dispatch(setActiveNote(id, {title, body, imageUrl, date}))
        : dispatch(setActiveNote(id, {title, body, date}));
    }
    
    return (
        <div 
            className='journal__entry pointer animate__animated animate__fadeIn animate__faster' 
            onClick={handleEntryClick}
        >
            {
                imageUrl && 
                <div 
                    className='journal__entry-picture'
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${imageUrl})`
                        // backgroundImage: 'url(https://previews.123rf.com/images/chalabala/chalabala1609/chalabala160900032/62776575-man-with-dog-on-the-trip-in-the-mountains-young-tourist-and-his-dog-are-resting-and-together-watchin.jpg)'
                    }}
                >
                </div>
            }
            <div className='journal__entry-body'>
                <p className='journal-entry-title'>
                    {title}
                </p>
                <p className='journal-entry-content'>
                    {body}
                </p>
            </div>

            <div className='journal__entry-date-box'>
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
        </div>
    )
}
