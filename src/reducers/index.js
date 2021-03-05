import { combineReducers } from 'redux';

//reducers
import AuthReducer from './AuthReducer';
import OptionsReducer from './OptionsReducer';
import ProjectReducer from './ProjectReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    Authentication: AuthReducer,
    Project: ProjectReducer,
    User: UserReducer,
    Options: OptionsReducer
})