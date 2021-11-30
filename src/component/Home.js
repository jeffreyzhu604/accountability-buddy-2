import React, { useEffect } from 'react';
import { UserList } from './users/UserList';
import { SearchBar } from './SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../actions';

export const Home = () => {
  const dispatch = useDispatch();

  const { users } = useSelector(state => ({
    users: state.userReducer.users
  }));

    // const [activeUser, setActiveUser] = useState({});

    // useEffect(() => {
    //   const user = users.filter(user => {
    //       console.log('user: ', user);
    //       return user.isAuthenticated === true && user.isAuthorized === true
    //   });
    //   console.log(`${user[0]}`);
    //   setActiveUser(user[0]);
    // }, []);

    useEffect(() => {
      dispatch(getUsers());
    }, []);

  return (
    <div className="home">
      <SearchBar />
      <h1>Members:</h1>
      <UserList users={users}/>
    </div>
  );
};
