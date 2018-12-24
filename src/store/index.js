import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers/index'
// import thunkMiddleware from 'redux-thunk'
import thunk from 'redux-thunk'
import api from '../middleware/api'

export const configureStore = preloadedState => {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, api))
}
