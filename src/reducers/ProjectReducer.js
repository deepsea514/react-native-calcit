import {
    FETCH_ALL_PROJECTS_REALM,
    SEARCH_PROJECTS,
    CLEAR_PROJECTS,
    SAVE_PROJECT,
    UPLOAD_CUSTOM_LOGO,
    TOGGLE_PDF_LOADER
} from '../actions/types';

const initialState = {
    allProjects: [],
    projects: [],
    isLoading: false,


    tempState: {},
    customLogo: {},

    isGeneratingPDF: false
};

export default function (state = initialState, action) {
    switch (action.type) {

        //fetching the projects 
        //savign projects to state
        case FETCH_ALL_PROJECTS_REALM:
            return {
                ...state,
                projects: action.payload,
                allProjects: action.payload,
                isLoading: action.isLoading
            }

        case SEARCH_PROJECTS:
            let query = action.payload;
            let newProjects = state.allProjects.filter(e => e.siteAddress.toLowerCase().includes(query.toLowerCase()))
            return {
                ...state,
                projects: newProjects
            }

        case CLEAR_PROJECTS:
            return {
                ...state,
                projects: [],
                allProjects: []
            }
        case SAVE_PROJECT:
            return {
                ...state,
                tempState: action.payload
            }
        case UPLOAD_CUSTOM_LOGO:
            return {
                ...state,
                customLogo: action.payload
            }
        case TOGGLE_PDF_LOADER:
            return {
                ...state,
                isGeneratingPDF: action.payload
            }
        //default case
        default:
            return {
                ...state
            };
    }
}