import {combineReducers} from 'redux'
import user from './user'
import lot from './lot'
import common from './common'

const rootReducer = combineReducers({
  user,
  lot,
  common
})

export default rootReducer