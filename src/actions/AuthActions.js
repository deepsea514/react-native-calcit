import {
    APP_LOGIN,
    APP_LOGOUT
} from './types';

export const appLogin = () => ({
    type: APP_LOGIN,
    payload: {}
})

export const appLogout = () => ({
    type: APP_LOGOUT,
    payload: {}
})