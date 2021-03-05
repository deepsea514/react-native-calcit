import { FETCH_USER_DETAILS_REALM, SAVE_USER_DETAILS_REALM, CLEAR_USER_DETAILS } from '../actions/types';

const initialState = {
    userDetails: {
        name: ''
    },
};

export default function (state = initialState, action) {
    switch (action.type) {

        //fetching user details
        //from realm database
        case FETCH_USER_DETAILS_REALM:
            return {
                ...state,
                userDetails: action.payload,
            }

        case SAVE_USER_DETAILS_REALM:
            return {
                ...state,
                userDetails: action.payload
            }

        case CLEAR_USER_DETAILS:
            return {
                ...state,
                userDetails: action.payload
            }

        //default case
        default:
            return {
                ...state
            };
    }
}