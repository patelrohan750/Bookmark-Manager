import {createStore,combineReducers,applyMiddleware, compose} from 'redux'
import { userReducer } from './Reducers/userReducer'
import {BookmarkReducer} from './Reducers/bookmarkReducer'
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer=combineReducers({user:userReducer,bookmark:BookmarkReducer})


const store=createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))


export default store;