import {
    LOG_IN,
    LOG_IN_ERROR,
    LOG_OUT,
    SET_LOADING,
    UPDATE_ACTIVE_USER
} from '../actions/types';

const initialState = {
    loggedIn: false,
    activeUser: {
        _id: "",
        friends: []
    },
    loading: false
};

export const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOG_IN:
            return {...state, loggedIn: true, activeUser: action.payload, loading: false};
        case LOG_OUT:
            return {...state, loggedIn: false, activeUser: "", loading: false};
        case UPDATE_ACTIVE_USER:
            return {...state, activeUser: action.payload, loading: false};
        case SET_LOADING:
            return {...state, loading: true};
        case LOG_IN_ERROR:
            return {...state, error: action.payload, loading: false};
        default:
            return state;
    };
};