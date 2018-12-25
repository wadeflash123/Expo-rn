import * as ActionTypes from '../actions/actionTypes'

const initState = {
  islogin: true,
  loginInfo: {}
}

export default user = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.ISLOGIN_SUCCESS:
      return Object.assign({}, state, {islogin: action.response.code === 0})
    case ActionTypes.USERLOGININ_SUCCESS:
      return Object.assign({}, state, {loginInfo: action.response.data, islogin: action.response.code === 0})
    case ActionTypes.USERLOGINOUT_SUCCESS:
      return Object.assign({}, state, {loginInfo: {}, islogin: false})
    default:
      return state
  }
}