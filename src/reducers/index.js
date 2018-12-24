import {combineReducers} from 'redux'
import * as ActionTypes from '../actions/actionTypes'
import user from './user'

const rootReducer = combineReducers({
  user
})

export default rootReducer