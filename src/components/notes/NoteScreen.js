import React, { useEffect, useRef } from 'react';
import { NotesAppBar } from './NotesAppBar';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { setActiveNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {
    const dispatch = useDispatch();
    const { active: activeNote } = useSelector((state) => state.notes);
    const [formValues, handleInputChange, reset] = useForm(activeNote);
    const { title, body } = formValues;
    const activeId = useRef(activeNote.id);

    const handleDelete = () => {
        dispatch(startDeleting(activeNote.id));
    }
        
    useEffect(() => {
        if (activeNote.id !== activeId.current) {
            reset(activeNote);
            activeId.current = activeNote.id;
        }
    }, [reset, activeNote])
    
    useEffect(() => {
        dispatch(setActiveNote(formValues.id, {...formValues}));
    }, [formValues, dispatch ])
    
    return (
        <div className="notes__main-content">
            <NotesAppBar />
  
            <div className="notes__content">
                <input
                    type="text"
                    name='title'
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    onChange={handleInputChange}
                    />

                <textarea
                    placeholder="What happened today"
                    name='body'
                    className="notes__textarea"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {
                    activeNote.imageUrl &&
                    <div className="notes__image mt-1">
                        <img
                            src={activeNote.imageUrl}
                            alt="landscape"
                        />
                    </div>
                }
            </div>

            <button
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    );
};
