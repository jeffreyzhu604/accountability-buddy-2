/*
    Sources:
    - https://stackoverflow.com/questions/63614183/react-router-dom-link-how-can-i-put-an-id-into-the-path-of-link
    
*/
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../actions';
import styles from '../../src/styles.css';

export const NavigationBar = () => {

    const history = useHistory();

    const { loggedIn, activeUser} = useSelector(state => ({
        loggedIn: state.loginReducer.loggedIn,
        activeUser: state.loginReducer.activeUser
    }));

    const dispatch = useDispatch();

    // localStorage

    return (
        <div>
            <ul className="nav-home">
                <li><Link to="/">Home</Link></li>
                <li>{(loggedIn) ? <Link to="/agreement">Agreements</Link> : <div></div>}</li>
                <li>{(loggedIn) ? <Link to={`/profile/${activeUser._id}`}>Profile</Link> : <div></div>}</li>
                <li><Link to="/documentation">Documentation</Link></li>
                <li><Link to="/sources">Sources</Link></li>
                <li>{(loggedIn) ? <button className="button-logout" onClick={() => dispatch(logout(history))}>Logout</button> : <Link to="/login">Login</Link>}</li>
            </ul> 
        </div>
    );
};
