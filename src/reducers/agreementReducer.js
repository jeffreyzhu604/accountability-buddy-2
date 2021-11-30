import {
    CREATE_AGREEMENT,
    GET_AGREEMENT,
    EDIT_AGREEMENT,
    DELETE_AGREEMENT,
    AGREEMENT_ERROR,
    SET_LOADING,
    RESET_ACTIVE_AGREEMENT
} from '../actions/types';

const initialState = {
    agreements: [],
    activeAgreement: {},
    loading: false
};

export const agreementReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_AGREEMENT:
            return {...state, agreements: [...state.agreements, action.payload], loading: false};
        case GET_AGREEMENT:
            return {...state, agreements: action.payload, loading: false};
        case EDIT_AGREEMENT:
        case DELETE_AGREEMENT:
        case AGREEMENT_ERROR:
            return {...state, error: action.payload};
        case SET_LOADING:
            return {...state, loading: true};
        case RESET_ACTIVE_AGREEMENT:
                return {...state, activeAgreement: {}};    
        default:
            return state;
    }
};