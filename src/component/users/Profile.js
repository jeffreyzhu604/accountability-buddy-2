/**
 * Sources:
 * - https://www.digitalocean.com/community/tutorials/react-axios-react
 * - https://dmitripavlutin.com/react-useeffect-infinite-loop/
 * - https://stackoverflow.com/questions/57444203/get-id-from-url-in-react-js
 * - https://stackoverflow.com/questions/69795799/useeffect-dependency-cause-an-infinite-loop
 * 
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import styles from '../../styles.css';
import { UserList } from './UserList';

// Conditional rendering: If activeUser allow editing, else no editing
export const Profile = () => {
    const dispatch = useDispatch();
    /*
        Persist data and clear data on refresh for the id and friends
    */
    let selectedID = useParams().id;

    const [selectedUser, setSelectedUser] = useState({});

    const [currentUserFriends, setCurrentUserFriends] = useState([]);

    const { users, activeUser } = useSelector(state => ({
        users: state.userReducer.users,
        activeUser: state.loginReducer.activeUser
    }));

    useEffect(() => {
        const user = users.find(user => user._id === selectedID);
        setSelectedUser(user);
    }, [selectedID]);

    useEffect(() => {
        const friends = users.filter(user => user.friends.includes(selectedID));
        setCurrentUserFriends(friends);
    }, [users, selectedID]);

    const filterProfileUsers = () => {
        if (selectedID == activeUser._id) {
            return users.filter(user => user._id !== activeUser._id).filter(user => user.friends.includes(activeUser._id));
        }
        return currentUserFriends;
    }

    return (
        <div className="profile-content">
            {selectedUser ? <h1>{`${selectedUser.firstName} ${selectedUser.lastName}`}</h1> : <div></div>}
            <h2>Friends:</h2>
            <UserList users={filterProfileUsers()} selectedID={selectedID} />
        </div>
    );
};