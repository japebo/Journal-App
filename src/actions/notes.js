import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote);
        // const docRef = db.collection(`${ uid }/journal/notes`).add( newNote );
        dispatch(addNewNote(docRef.id, newNote));
        dispatch(setActiveNote(docRef.id, newNote));
    };
};

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {id, note}
})

export const setActiveNote = ( id, note ) => ({
    type: types.notesSetActive,
    payload: {
        id, 
        ...note
    }
})
 
export const startLoadingNotes = (uid) => {
    return async ( dispatch ) => {
        const notes = await loadNotes(uid);
        dispatch( setNotes(notes) );
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSavingNote = ( note ) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
       
        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        await updateDoc(doc(db,`${uid}/journal/notes/${ note.id }`), noteToFirestore);
        dispatch(refreshNote(note.id, note));
        Swal.fire('Saved', note.title, 'success') 
    }
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdate,
    payload: { id, note }
})

export const startImageUpload = (file) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes;
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const imageUrl = await fileUpload(file);
        activeNote.imageUrl = imageUrl;
        dispatch(startSavingNote(activeNote));
        Swal.close();
    }
}

export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;

        await deleteDoc(doc(db,`${uid}/journal/notes/${ id }`));

        dispatch(deleteNote(id));
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
})

// export const uploadImage = () => {
//     type: types.notesFileUrl,
//     payload: { id, note }
// }
