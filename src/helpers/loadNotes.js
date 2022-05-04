import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase/firebase-config"

export const loadNotes = async (uid) => {
    const notesSnap = await getDocs(collection(db, `${uid}/journal/notes`));

    const notes = [];
    notesSnap.forEach( sonSnap => {
        notes.push({
            id: sonSnap.id,
            ...sonSnap.data()
        });
        
    })
    // console.log(notesSnap); 
    return notes;
}