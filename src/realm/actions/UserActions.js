import Realm from 'realm';

//database options
import databaseOptions, { USER_SCHEMA } from '../database/index';

export const saveUserDetails = userDetails => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
            let users = realm.objects(USER_SCHEMA);
            let userIndex = users.findIndex(e => e.id === userDetails.id);
            let detailsToAdd = {
                id: userDetails.id ? (userDetails.id) : (''),
                name: userDetails.name ? (userDetails.name) : (''),
                notification_token: userDetails.notification_token ? (userDetails.notification_token) : (''),
                email: userDetails.email ? (userDetails.email) : (''),
                password: userDetails.password ? (userDetails.password) : (''),
                access_token: userDetails.access_token ? (userDetails.access_token) : (''),

            }
            if (userIndex === -1)
                realm.create(USER_SCHEMA, detailsToAdd);
            else {
                let detailsToUpdate = realm.objectForPrimaryKey(USER_SCHEMA, userDetails.id);
                detailsToUpdate.name = userDetails.name ? (userDetails.name) : (detailsToUpdate.name);
                detailsToUpdate.notification_token = userDetails.notification_token ? (userDetails.notification_token) : (detailsToUpdate.notification_token);
                detailsToUpdate.email = userDetails.email ? (userDetails.email) : (detailsToUpdate.email);
                detailsToUpdate.access_token = userDetails.access_token ? (userDetails.access_token) : (detailsToUpdate.access_token);
            }
            resolve({
                response: true, data: { userDetails }
            });
        });
    }).catch((error) => {
        console.log(error, "error while saving")
        reject({ response: false, error })
    })
})


export const fetchUserDetails = (id) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let userDetails = realm.objectForPrimaryKey(USER_SCHEMA, id);
        resolve({ userDetails });
    }).catch((error) => { reject({ response: false, error }) })
})

export const updateDetails = (id, details) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
            let userDetails = realm.objectForPrimaryKey(USER_SCHEMA, id);
            userDetails.name = details.name ? details.name : userDetails.name;
            resolve({ response: true, userDetails });
        });
    }).catch((error) => { reject({ response: false, error }) })
})

export const updatePassword = (id, password) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
            let userDetails = realm.objectForPrimaryKey(USER_SCHEMA, id);
            if (userDetails) {
                userDetails.password = password
            }
            else {
                realm.create(USER_SCHEMA, {
                    id: id,
                    password: password,
                    email: '',
                    notification_token: '',
                    name: '',
                    access_token: ''
                })
            }
            resolve({ response: true, userDetails });
        });
    }).catch((error) => { reject({ response: false, error }) })
});

export const checkOfflineUser = (email, password) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let users = realm.objects(USER_SCHEMA);
        let user = users.find(e => e.email === email);
        // console.log(user)
        let authentication = {
            userFound: user ? true : false,
            authenticated: false,
            id: user ? user.id : null,
            access_token: user ? user.access_token : null
        };
        if (user && user.password === password) {
            authentication.authenticated = true;
        }
        else authentication.authenticated = false;
        resolve(authentication);
    }).catch((error) => { reject(error) })
})

export const saveAccessToken = (id, access_token) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
            let userDetails = realm.objectForPrimaryKey(USER_SCHEMA, id);
            if (userDetails) {
                userDetails.access_token = access_token
            }
            resolve({ response: true, userDetails });
        });
    }).catch((error) => { reject({ response: false, error }) })
});

export const getUserById = (id) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let userDetails = realm.objectForPrimaryKey(USER_SCHEMA, id);
        resolve({ response: true, userDetails })
    }).catch((error) => { reject({ response: false, error }) })
})