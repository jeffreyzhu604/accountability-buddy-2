import {
    ADD_USER,
    REMOVE_USER,
    EDIT_USERS_ERROR,
    UPDATE_FRIENDS,
    GET_USERS
} from '../actions/types';

const initialState = {
    users: []
};

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USERS:
            return {...state, users: action.payload};
        case ADD_USER:
            return {...state, users: action.payload};
        case REMOVE_USER:
            return {...state, users: action.payload};
        case EDIT_USERS_ERROR:
            return {...state, error: action.payload};
        case UPDATE_FRIENDS: 
            return {...state, users: action.payload};
        default:
            return state;
    };
};


