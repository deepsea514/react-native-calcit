import {
    CLEAR_PROJECTS,
    FETCH_ALL_PROJECTS_REALM,
    SAVE_PROJECT,
    SEARCH_PROJECTS,
    UPLOAD_CUSTOM_LOGO,
    GET_PROJECT_STATE,
    TOGGLE_PDF_LOADER
} from './types';

//realm actions
import { fetchAllProjects, fetchCustomLogo, saveCustomLogo, saveProjectState, fetchProjectState } from '../realm/actions/ProjectActions';

//async
import AsyncStorage from '@react-native-community/async-storage';

//uuid
import { v1 as uuidv1 } from 'react-native-uuid';

export const getProjects = () => dispatch => {
    dispatch({
        type: FETCH_ALL_PROJECTS_REALM,
        payload: [],
        isLoading: true
    });
    fetchAllProjects().then((response) => {
        if (response.response) {
            dispatch({
                type: FETCH_ALL_PROJECTS_REALM,
                payload: response.data.allProjects,
                isLoading: false
            });
        }
    })
        .catch((e) => {
            console.log(e)
            alert("Something went wrong, while fetching the projects. Please contact Admin!")
        })
}

export const searchProjects = (query) => dispatch => {
    dispatch({
        type: SEARCH_PROJECTS,
        payload: query
    })
}

export const clearProjects = () => dispatch => {
    dispatch({
        type: CLEAR_PROJECTS,
        payload: {}
    })
}

export const saveProject = (projectId, state) => dispatch => {
    // dispatch({
    //     type: SAVE_PROJECT,
    //     payload: JSON.stringify(state)
    // })
    AsyncStorage.getItem('@id').then((id) => {
        // console.log(state.childrenElements, state.toString())
        try {
            saveProjectState(JSON.stringify(state), +id, projectId, uuidv1()).then((response) => {
                if (response.response) {
                    console.log("Saved successfully!!")
                }
            })
        }
        catch (error) {
            console.log(error, "error while saving the project")
        }
    }).catch((error) => {
        console.log(error, "error while getting user id from async")
    })
}

export const getProjectState = (projectId) => dispatch => {
    AsyncStorage.getItem('@id').then((id) => {
        try {
            fetchProjectState(projectId, +id).then((response) => {
                if (response.response) {
                    dispatch({
                        type: GET_PROJECT_STATE,
                        payload: response.data.projectState
                    })
                }
            }).catch((error) => {
                console.log(error, "error while getting project state1")
            })
        }
        catch (error) {
            console.log(error, "error while getting project state2")
        }
    }).catch((error) => {
        console.log(error, "error while getting user id from async")
    })
}

export const uploadCustomLogo = (logo) => dispatch => {
    AsyncStorage.getItem('@id').then((id) => {
        let body = {
            id: uuidv1(),
            customLogo: JSON.stringify(logo),
            userId: +id
        }
        try {
            saveCustomLogo({
                ...body
            }).then((response) => {
                if (response.response) {
                    dispatch({
                        type: UPLOAD_CUSTOM_LOGO,
                        payload: logo
                    });
                }
            })
                .catch((error) => {
                    console.log(error, "error while uploading photo")
                })
        }
        catch (error) {
            console.log(error);
        }
    })
}

export const getCustomLogo = () => dispatch => {
    AsyncStorage.getItem('@id').then((id) => {
        fetchCustomLogo(id).then((response) => {
            if (response.response) {
                let { customLogo } = response.data;
                let logo = JSON.parse(customLogo);
                dispatch({
                    type: UPLOAD_CUSTOM_LOGO,
                    payload: logo
                })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    })
}

export const togglePdfLoader = (currentState) => dispatch => {
    dispatch({
        type: TOGGLE_PDF_LOADER,
        payload: currentState
    })
}