import React from 'react'

export const NotesAppBar = () => {
    return (
        <div className='notes__appbar'>
            <span>January 19th, 2022</span>
            <div>
                <button className='btn'>
                    Picture
                </button>
                <button className='btn'>
                    Save
                </button>
            </div>
        </div>
    )
}
