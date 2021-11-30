import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addUser, removeUser } from '../../actions';

export const User = ({ id, username, profileMessage, dateJoined, friends, activeUser, trimDate }) => {

    const dispatch = useDispatch();

    const { loggedIn } = useSelector(state => ({
        loggedIn: state.loginReducer.loggedIn   
    }));

    const [localStateUser, setLocalStateUser] = useState({});

    useEffect(() => {
        const user = localStorage.getItem('activeUser');
        if (user) {
            setLocalStateUser(JSON.parse(user));
        }
    }, [])

    const addFriend = () => {
        dispatch(addUser({
            activeUser: activeUser,
            _id: id
        }));
    }

    const removeFriend = () => {
        dispatch(removeUser({
            activeUser: activeUser,
            _id: id
        }));
    }

    const renderButtons = () => {
        if (loggedIn) {
            if (friends.includes(activeUser._id) && id === activeUser._id) {
                return <div></div>
            } else if (friends.includes(activeUser._id)) {
                return <button onClick={() => removeFriend()} className="button-nav buttons">Remove friend</button>;
            } else {
                return <button onClick={() => addFriend()} className="button-nav buttons">Add friend</button>;
            }
        } 
        return <div></div>
    }

    return (
        <div className="card">
            <Link to={`/profile/${id}`}><h3>{`${username}`}</h3></Link>
            <div className="user-list-description">
                <p>{profileMessage}</p>
                <p>{trimDate(dateJoined)}</p>
                {renderButtons()} 
            </div>
        </div>
               
    );
};