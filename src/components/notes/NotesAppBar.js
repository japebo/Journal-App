import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startImageUpload, startSavingNote } from '../../actions/notes';

export const NotesAppBar = () => {
    const dispatch = useDispatch();
    const { active: activeNote } = useSelector( state => state.notes );

    const handleSave = () => {
        dispatch(startSavingNote(activeNote));
    }

    const handlePictureUpload = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile);
        if (selectedFile) {
            dispatch(startImageUpload(selectedFile));
        }
    }

    return (
        <div className='notes__appbar'>
            <span>January 19th, 2022</span>
            <input 
                id='fileSelector'
                type='file'
                style={{display: 'none'}}
                onChange={ handleFileChange }
            />
            <div>
                <button 
                    className='btn'
                    onClick={handlePictureUpload}
                >
                    Picture
                </button>
                <button 
                    className='btn'
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
