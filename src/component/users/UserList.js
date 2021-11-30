import React from 'react';
import { User } from './User';
import { useSelector } from 'react-redux';

export const UserList = ({ users, selectedID }) => {
    const { activeUser, currentSearch } = useSelector(state => ({
        activeUser: state.loginReducer.activeUser,
        currentSearch: state.searchBarReducer.currentSearch
    }));

    const trimDate = date => {
        const dateCutoffLength = 10;
        let result = "";
        
        for (let i = 0; i < dateCutoffLength; i += 1) {
            result = result += date.charAt(i);
        }
        
        const year = result.substring(0, 4);
        const month = result.substring(5, 7);
        const day = result.substring(8);

        let monthName = "";
        switch(Number(month)) {
            case 1:
                monthName = "January";
                break;
            case 2: 
                monthName = "February";
                break;
            case 3: 
                monthName = "March";
                break;
            case 4: 
                monthName = "April";
                break;
            case 5:
                monthName = "May";
                break;
            case 6: 
                monthName = "June";
                break;
            case 7: 
                monthName = "July";
                break;
            case 8: 
                monthName = "August";
                break;
            case 9:
                monthName = "September";
                break;
            case 10: 
                monthName = "October";
                break;
            case 11: 
                monthName = "November";
                break;
            case 12:
                monthName = "December";
        }

        return monthName + " " + day + ", " + year;
    }

    const generateList = () => {
        if (currentSearch === '') {
            return users.map(user => {
                return (
                    <User 
                        key={user._id}
                        id={user._id}
                        username={user.username}
                        profileMessage={user.profileMessage}
                        dateJoined={user.dateJoined}
                        friends={user.friends}
                        activeUser={activeUser}
                        trimDate={trimDate}
                    />                
                );
            });            
        }
        return users.filter(user => user.username.includes(currentSearch)).map(user => {
            return (
                <User 
                    key={user._id}
                    id={user._id}
                    username={user.username}
                    profileMessage={user.profileMessage}
                    dateJoined={user.dateJoined}
                    friends={user.friends}
                    activeUser={activeUser}
                    trimDate={trimDate}
                />                
            );
        });   
    }



    return (
        <div>
            {/*searchDataSubmission.length > 0 ? generateFilteredList() : generateList()*/}
            <div className="user-list">
                <div className="cards">
                    {generateList()}
                </div>
            </div>
        </div>
    );
}