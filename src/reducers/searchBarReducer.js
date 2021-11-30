import {
    NEW_SEARCH
} from '../actions/types';

const initialState = {
    currentSearch: ""
};

export const searchBarReducer = (state = initialState, action) => {
    switch(action.type) {
        case NEW_SEARCH:
            return {...state, currentSearch: action.payload};
        default:
            return state;
    }
};