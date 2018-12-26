import * as ActionTypes from '../actions/actionTypes'

const initState = {
  islogin: true,
  userInfo: {},
  userBalance: {}
}

export default user = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.ISLOGIN_SUCCESS:
      return Object.assign({}, state, {islogin: action.response.code === 0})
    case ActionTypes.USERLOGININ_SUCCESS:
      return Object.assign({}, state, {userInfo: action.response.data, islogin: action.response.code === 0})
    case ActionTypes.USERLOGINOUT_SUCCESS:
      return Object.assign({}, state, {userInfo: {}, islogin: false})
    case ActionTypes.USERBALANCE_SUCCESS:
      return Object.assign({}, state, {userBalance: action.response.data.banlance})
    default:
      return state
  }
}