import { CALL_API } from '../middleware/api'
import * as ActionTypes from './actionTypes'

// 检查用户登陆状态
const fetchIsLogin = ({cb}) => ({
  [CALL_API]: {
    types: [ActionTypes.ISLOGIN_REQUEST, ActionTypes.ISLOGIN_SUCCESS, ActionTypes.ISLOGIN_FAILURE],
    endpoint: '/user/getLoginUser',
    fetchOptions: {},
    callBack: cb
  }
})

export const getIsLogin = ({cb}) => (dispatch) => {
  return dispatch(fetchIsLogin({cb}))
}

// 登陆
const fetchLoginIn = ({data, cb}) => ({
  [CALL_API]: {
    types: [ActionTypes.USERLOGININ_REQUEST, ActionTypes.USERLOGININ_SUCCESS, ActionTypes.USERLOGININ_FAILURE],
    endpoint: '/user/j_acegi_security_check',
    fetchOptions: {
      method: 'POST',
      data
    },
    callBack: cb,
    retry: 0
  }
})

export const userLoginIn = ({data, cb}) => (dispatch) => {
  return dispatch(fetchLoginIn({data, cb}))
}

// 退出
const fetchLoginOut = ({cb}) => ({
  [CALL_API]: {
    types: [ActionTypes.USERLOGINOUT_REQUEST, ActionTypes.USERLOGINOUT_SUCCESS, ActionTypes.USERLOGINOUT_FAILURE],
    endpoint: '/user/j_acegi_logout',
    fetchOptions: {},
    callBack: cb
  }
})

export const userLoginOut = ({cb}) => (dispatch) => {
  return dispatch(fetchLoginOut({cb}))
}

// 获取账户信息
const fetchUserBalance = ({data, cb}) => ({
  [CALL_API]: {
    types: [ActionTypes.USERBALANCE_REQUEST, ActionTypes.USERBALANCE_SUCCESS, ActionTypes.USERBALANCE_FAILURE],
    endpoint: '/user/getUserBalance',
    fetchOptions: {
      data
    },
    callBack: cb
  }
})

export const userBalance = ({data, cb}) => (dispatch) => {
  return dispatch(fetchUserBalance({data, cb}))
}

// 查询平台公告
const fetchPlatformNotices = ({data, cb}) => ({
  [CALL_API]: {
    types: [ActionTypes.PLATFORMNOTICES_REQUEST, ActionTypes.PLATFORMNOTICES_SUCCESS, ActionTypes.PLATFORMNOTICES_FAILURE],
    endpoint: '/user/notice/queryNoticeList',
    fetchOptions: {
      data
    },
    callBack: cb
  }
})

export const platformNotices = ({data, cb}) => (dispatch) => {
  return dispatch(fetchPlatformNotices({data, cb}))
}
