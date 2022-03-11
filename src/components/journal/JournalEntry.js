import React from 'react'

export const JournalEntry = () => {
    return (
        <div className='journal__entry pointer'>
            <div 
                className='journal__entry-picture'
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://previews.123rf.com/images/chalabala/chalabala1609/chalabala160900032/62776575-man-with-dog-on-the-trip-in-the-mountains-young-tourist-and-his-dog-are-resting-and-together-watchin.jpg)'
                }}
            >
            </div>

            <div className='journal__entry-body'>
                <p className='journal-entry-title'>
                    Un nuevo día
                </p>
                <p className='journal-entry-content'>
                    Eu minim mollit amet et amet veniam proident mollit.
                </p>
            </div>

            <div className='journal__entry-date-box'>
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    )
}
