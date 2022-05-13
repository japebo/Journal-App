import { types } from "../types/types";

/*
    {
        notes: [],
        active: null 
            OR
        active: { 
            id: 'JHKSDA71JK1EH723HD782HD',
            title: '',
            body: '',
            imageUrl: '',
            date: 12342353453465
        }
    }
*/
const initialState = { notes: [], active: null};

export const notesReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.notesAddNew:
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            }
        case types.notesSetActive:
            return {
                ...state,
                active: {...action.payload}
            }
        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }
        case types.notesUpdate:
            return {
                ...state,
                notes: state.notes.map( 
                    note => note.id === action.payload.id 
                        ? action.payload.note 
                        : note
                    )
            }   
        case types.notesDelete:
            return {
                active: null,
                notes: state.notes.filter( note => note.id !== action.payload)
            }
        
        case types.notesLogoutCleaning:
            return {
                notes: [],
                active: null
            }

        default:
            return state;
    }    

}