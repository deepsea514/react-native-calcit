import { BASE_URL } from '../consts/Config';
import AsyncStorage from '@react-native-community/async-storage';

export default async function Helper(url, method, body, isFormData) {
    return fetch(BASE_URL + url, {
        method: method,
        headers: await getHeaders(isFormData),
        body: isFormData ? (body) : (method !== 'GET' ? JSON.stringify(body) : null),
    })
        .then((response) => {
            if (response.status === 401) {
                //reserved case
                //use case if authentication expires
                console.log("Authentication failed");
                appLogout()

            }
            else {
                //returning response json 
                return response.json()
            }
        })
        .catch((error) => {
            console.log("Something went wrong with api/internet connection", error);
        })
}

async function getHeaders(isFormData) {
    let res = await AsyncStorage.getItem('@access_token');
    if (isFormData) {
        return {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${res}`,
            'Accept': 'application/json'
        }
    }
    else {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${res}`,
            'Accept': 'application/json'
        }
    }
}

export const appLogout = () => ({
    type: 'APP_LOGOUT',
    payload: {}
})