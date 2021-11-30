/*
    Sources:
    - https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
*/
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/index';

export const LoginForm = () => {
    
    const history = useHistory();
    const dispatch = useDispatch();
    
    const {loggedIn} = useSelector(state => ({
        loggedIn: state.loginReducer.loggedIn
    }));

    const [formValue, setFormValue] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!loggedIn) {
            dispatch(login(formValue));
        }
        setFormValue({
            ...formValue,
            email: "",
            password: ""
        });
        history.push("/");
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    Email:
                </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    autoComplete="off"
                    value={formValue.email}
                    onChange={handleChange}
                />
                <br/>
                <br/>                
                <label htmlFor="password">
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="off"
                    value={formValue.password}
                    onChange={handleChange}
                />
                <br/>
                <br/>                
                <button className="button-nav buttons" type="submit">
                    Login
                </button>
                <br/>
                <br/>
                <Link to="/register">Not a user? Register now!</Link>
            </form>
        </div>

    );
};