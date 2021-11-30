/*
    Sources:
    - https://surajsharma.net/blog/axios-post-form-data
*/
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addAgreement, resetActiveAgreement } from '../../actions';

export const AgreementForm = () => {

    const { activeUser, users, loading } = useSelector(state => ({
        activeUser: state.loginReducer.activeUser,
        users: state.userReducer.users,
        loading: state.agreementReducer.loading
    }));

    /*
        TO DO: 
        - format of date: 2021-11-12
    */
    const history = useHistory();

    const dispatch = useDispatch();
    
    const [formValue, setFormValue] = useState({
        endDate: "",
        amount: "",
        description: "",
        friend: ""
    });

    const handleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });  
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFriend(formValue.friend)) {
            console.log(formValue)
            dispatch(addAgreement({
                endDate: formValue.endDate,
                amount: formValue.amount,
                description: formValue.description,
                friendID: getFriendID(formValue.friend),
                creatorID: activeUser._id
            }));
            // Update users here
            setFormValue({
                ...formValue,
                endDate: "",
                amount: "",
                description: "",
                friend: ""
            });
            if (!loading) {
                console.log('not loading');
                history.push("/agreement");
            }
        }
    }

    const isFriend = (friend) => {
        // Find the friend
        const result = users.find(user => user.username === friend);
        if (!result) {
            alert(`${friend} is not your friend`);
            return false;
        }
        console.log(result._id, activeUser.friends)
        if (activeUser.friends.includes(result._id)) return true;
        console.log('not friend')
        return false;
    }

    const getFriendID = (friend) => {
        const result = users.find(user => user.username === friend);
        if (result) return result._id;
        return "";
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <br/>
                    <br/>
                    <label htmlFor="endDate">
                        End date:
                    </label>
                    <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    autoComplete="off"
                    value={formValue.endDate}
                    onChange={handleChange}
                    />
                    <br/>
                    <br/>
                    <label htmlFor="amount">
                        Amount:
                    </label>
                    <input
                    type="text"
                    id="amount"
                    name="amount"
                    autoComplete="off"
                    value={formValue.amount}
                    onChange={handleChange}
                    />
                    <br/>
                    <br/>
                    <label htmlFor="description">
                        Description:
                    </label>
                    <input
                    type="text"
                    id="description"
                    name="description"
                    autoComplete="off"
                    value={formValue.description}
                    onChange={handleChange}
                    />
                    <br/>
                    <br/>            
                    <label htmlFor="friend">
                        Friend:
                    </label>
                    <input
                    type="friend"
                    id="friend"
                    name="friend"
                    autoComplete="off"
                    value={formValue.friend}
                    onChange={handleChange}
                    />
                    <br/>
                    <br/>
                    <button className="button-nav buttons" type="submit" >
                        Create Agreement
                    </button>
                    <button className="button-nav buttons" onClick={
                        () => {history.push("/agreement");}
                    }> 
                        Cancel
                    </button>
                    <br/>
                    <br/>
                </form>    
            </div>
        </div>
    );
};