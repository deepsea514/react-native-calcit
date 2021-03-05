import {
    FETCH_USER_DETAILS_REALM,
    SAVE_USER_DETAILS_REALM,
    CLEAR_USER_DETAILS
} from './types';
import AsyncStorage from '@react-native-community/async-storage';

//realm actions
import { fetchUserDetails, updateDetails } from '../realm/actions/UserActions';

export const getUserDetailsFromRealm = () => dispatch => {
    AsyncStorage.getItem('@id').then((id) => {
        let ID = +id;
        fetchUserDetails(ID).then((response) => {
            if (response.userDetails) {
                dispatch({
                    type: FETCH_USER_DETAILS_REALM,
                    payload: response.userDetails,
                });
            }
        })
            .catch((e) => {
                console.log(e)
                alert("Something went wrong, while fetching the userdetails. Please contact Admin!")
            })
    })
        .catch((error) => { })
}

export const saveUserDetailsToRealm = (details) => dispatch => {
    AsyncStorage.getItem('@id').then((id) => {
        let ID = +id;
        updateDetails(ID, details)
            .then((response) => {
                if (response.response) {
                    dispatch({
                        type: SAVE_USER_DETAILS_REALM,
                        payload: response.userDetails,
                    });
                }
            })
            .catch((error) => {
                alert("Something went wrong while updating the name to database!!")
            })
    })
        .catch((error) => { })
}

export const clearUserDetails = () => dispatch => {
    dispatch({
        type: CLEAR_USER_DETAILS,
        payload: {}
    })
}