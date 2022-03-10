import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import boxScoreReducer from './reducers/boxScoreReducer';

const rootReducer = combineReducers({
    scores: boxScoreReducer
})

const configureStore = () => createStore(
    rootReducer, 
    applyMiddleware(thunk));

export default configureStore;