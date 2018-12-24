import { CALL_API } from '../middleware/api'
import * as ActionTypes from './actionTypes'

// 检查用户登陆状态
const fetchIsLogin = (cb) => ({
  [CALL_API]: {
    types: [ActionTypes.ISLOGIN_REQUEST, ActionTypes.ISLOGIN_SUCCESS, ActionTypes.ISLOGIN_FAILURE],
    endpoint: '/user/getLoginUser',
    fetchOptions: {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      }
    },
    callBack: cb
  }
})

export const getIsLogin = (cb) => (dispatch) => {
  return dispatch(fetchIsLogin(cb))
}

// 登陆
const fetchLoginIn = (data, cb) => ({
  [CALL_API]: {
    types: [ActionTypes.USERLOGININ_REQUEST, ActionTypes.USERLOGININ_SUCCESS, ActionTypes.USERLOGININ_FAILURE],
    endpoint: '/user/j_acegi_security_check',
    fetchOptions: {
      method: 'POST',
      body: data
    },
    callBack: cb
  }
})

export const userLoginIn = (data, cb) => (dispatch) => {
  return dispatch(fetchLoginIn(data, cb))
}

