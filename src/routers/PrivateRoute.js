import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    localStorage.setItem('lastPath', rest.location.pathname); //for when navigating inside my private routes the app always maintain in memory (localstorage of the browser) the last route visited before a logout. On the other hand, inside the handleLogin method, this route is retreived from memory and passed to the history.replace. This way the user will be redirected to the route it was before the logout.

    return (
        <Route {...rest} component={ (props) => (
            (isAuthenticated) 
                ? <Component {...props} /> 
                : <Redirect to='/auth/login'/>
        )}
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
