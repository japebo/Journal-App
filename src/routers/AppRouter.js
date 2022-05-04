import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { 
    BrowserRouter as Router,
    Switch  
} from 'react-router-dom'
import { login } from '../actions/auth'
import { startLoadingNotes } from '../actions/notes'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {
    const dispatch = useDispatch();
    
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {  
            // console.log(user);
            if ( user?.uid ) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                dispatch(startLoadingNotes(user.uid));
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        }); 
    }, [ dispatch ])
    
    if ( checking ) {
        return (
            <h1>Please, wait...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute isAuthenticated={isLoggedIn} path='/auth/' component={ AuthRouter }/>
                    <PrivateRoute isAuthenticated={isLoggedIn} path='/' component={ JournalScreen } />
                </Switch>
            </div>            
        </Router>
    )
}
