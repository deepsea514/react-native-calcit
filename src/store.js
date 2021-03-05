import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import rootReducer from './reducers';

//middleware used
import thunk from 'redux-thunk';

let middleware = [thunk];
//initial state
let initialState = {};

//store definition
export default createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware)
    )
)