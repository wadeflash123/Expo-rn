import {combineReducers} from 'redux'
import user from './user'
import lot from './lot'

const rootReducer = combineReducers({
  user,
  lot
})

export default rootReducer