import { types } from "../types/types";
import { googleAuthProvider } from "../firebase/firebase-config";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2'

const auth = getAuth();

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading())
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            // dispatch( login(user.uid, user.displayName));
            dispatch(finishLoading())
        })
        .catch((e) => {
            console.log(e);
            dispatch(finishLoading())
            Swal.fire('Error', e.message, 'error');
        });
    } 
}

export const startRegisterWithEmailPsswdName = (email, password, name) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then( async (userCredential) => {
                const {user} = userCredential;
                console.log(user);

                await updateProfile (auth.currentUser, {
                    displayName: name
                  })

                dispatch(login(user.uid, user.displayName));

            })
            .catch((e) => {
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            });
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        signInWithPopup(auth, googleAuthProvider)
            .then( (userCred) => {
                const {user} = userCred;
                // console.log(userCred);
                dispatch( login( user.uid, user.displayName) )
            })
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid, 
        displayName
    }
})

export const startLogout = () => {
    return async ( dispatch ) => {
        await signOut(auth);
        dispatch(logout());
    }
}

export const logout = () => ({
    type: types.logout
})