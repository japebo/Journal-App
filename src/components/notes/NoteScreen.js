import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
        <div className='notes__main-content'>
            <NotesAppBar />

            <div className='notes__content'>
                <input
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input' 
                    autoComplete='off'
                />

                <textarea 
                    placeholder='What happened today'
                    className='notes__textarea'
                >
                </textarea>

                <div className='notes__image mt-1'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVlknDLSrzFM7JdLEe4PmNWn9wAEEvPR9QEw&usqp=CAU' alt='landscape' />
                </div>
            </div>
        </div>
    )
}
