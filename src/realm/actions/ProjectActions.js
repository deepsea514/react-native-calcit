import AsyncStorage from '@react-native-community/async-storage';
import Realm from 'realm';

//database options
import databaseOptions, { CUSTOM_LOGO_SCHEMA, NEWPROJECT_SCHEMA, PROJECT_SCHEMA } from '../database/index';

export const insertNewProject = newProject => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
            realm.create(NEWPROJECT_SCHEMA, { ...newProject, createdAt: Date() });
            resolve({
                response: true, data: { newProject }
            });
        });
    }).catch((error) => {
        console.log(error, "error while saving")
        reject({ response: false, error })
    })
})

export const fetchAllProjects = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(async (realm) => {
        let id = await AsyncStorage.getItem('@id');
        id = +id;
        let allProjects = realm.objects(NEWPROJECT_SCHEMA);
        let sortedProjects = allProjects.sorted('createdAt', true);
        let projectsById = sortedProjects.filter(e => e.userId === id);
        resolve({ response: true, data: { allProjects: projectsById } });
    }).catch((error) => { reject({ response: false, error }) })
})


export const fetchProjectsById = (id) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let allProjects = realm.objects(NEWPROJECT_SCHEMA);
        let projectsById = allProjects.filter(e => e.userId === id);
        // let sortedProjects = projectsById.sorted('createdAt', true);
        resolve({ response: true, data: { allProjects: projectsById } });
    }).catch((error) => { reject({ response: false, error }) })
})

export const fetchCustomLogo = (id) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let allCustomLogos = realm.objects(CUSTOM_LOGO_SCHEMA);
        // console.log(allCustomLogos, id)
        let customLogosById = allCustomLogos.sorted('createdAt', true);
        let latestCustomLogos = customLogosById.filter(e => e.userId == id);

        resolve({
            response: true,
            data: {
                customLogo: latestCustomLogos.length > 0 ? latestCustomLogos[0].customLogo : '{"uri": ""}'
            }
        })
    })
})



export const saveCustomLogo = (newLogo) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
            realm.create(CUSTOM_LOGO_SCHEMA, { ...newLogo, createdAt: Date() });
            resolve({
                response: true,
                data: {
                    newLogo
                }
            })
        });
    }).catch((error) => {
        console.log(error, "Error while saving the logo")
        reject({
            response: false, error
        })
    })
})

export const saveProjectState = (state, userId, projectId, id) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
            realm.create(PROJECT_SCHEMA, { projectStates: state, createdAt: Date(), userId, projectId, id: id });
            resolve({
                response: true,
                data: {
                    projectStates: state
                }
            })
        })
    }).catch((error) => {
        console.log(error, "Error while saving the project state")
        reject({
            response: false,
            error
        })
    })
})


export const fetchProjectState = (projectId, userId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let allProjectStates = realm.objects(PROJECT_SCHEMA);
        allProjectStates = allProjectStates.sorted('createdAt', true);
        let requiredProjects = allProjectStates.filter(e => e.userId === userId && e.projectId === projectId)
        resolve({
            response: true,
            data: {
                projectState: requiredProjects.length > 0 ? requiredProjects[0] : null
            }
        })
    }).catch((error) => {
        console.log(error, "Error while getting the project state")
        reject({
            response: false,
            error
        })
    })
})

