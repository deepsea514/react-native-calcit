import { APP_LOGOUT, APP_LOGIN } from '../actions/types';

const initialState = {
    isLoggedIn: false
};

export default function (state = initialState, action) {
    switch (action.type) {

        //in case of login just 
        //make the state isLoggedIn true
        //so that whole conditional rendering
        //can be made out
        case APP_LOGIN:
            return {
                ...state,
                isLoggedIn: true
            }

        //in case of logout just 
        //make the state isLoggedIn false
        case APP_LOGOUT:
            return {
                ...state,
                isLoggedIn: false
            }

        //default case
        default:
            return {
                ...state
            };
    }
}