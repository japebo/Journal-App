import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm'
import validator from "validator";

export const LoginScreen = () => {

    const [formValues, handleInputChange] = useForm({
        email:'javiborges95@gmail.com',
        password:'123456'
    });

    const { email, password } = formValues;

    const dispatch = useDispatch();
    const { loading, errorMsg } = useSelector( state => state.ui);

    const handleLogin = (e) => {
        e.preventDefault();

        if(isFormValid()){
            dispatch( startLoginEmailPassword (email, password) );
        }
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    const isFormValid = () => {
        
        if ( !validator.isEmail(email) ) {
            dispatch(setError('Email is not valid'));
            return false;
        } else if ( password.length <= 5 ) {
            dispatch(setError('Password must be at least 6 characters of length'));
            return false;
        }

        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className='auth__title'>Login</h3>

            <form onSubmit={ handleLogin }>
                { 
                    errorMsg && 
                    (<div className='auth__alert-error'>
                        {errorMsg}
                    </div>)
                }
                <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    value={ email }
                    className='auth__input'
                    onChange={ handleInputChange }
                    autoComplete='off'
                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={ password }
                    onChange={ handleInputChange }
                    className='auth__input'
                />
                <button
                type='submit'
                className='btn btn-primary btn-block'
                disabled={ loading }
                >
                    Login
                </button>

                <div className='auth__social-networks'>
                    <p>Login with Social Networks</p>
                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link 
                    to='/auth/register'
                    className='links'
                >
                    Create new account
                </Link>
            </form>
        </>
    )
}
