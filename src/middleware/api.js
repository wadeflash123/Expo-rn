import axios from 'axios';
import { API_ROOT, platformKey, RES_CODE, captchaImgApi } from '../api/apiConfig';
import { Platform } from 'react-native';

// axios 配置
axios.defaults.withCredentials = true
axios.defaults.timeout = 8000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// axios.defaults.baseURL = apiConfig.proxyUrl

// 请求 post传参序列化
axios.interceptors.request.use((config) => {
  let { method, retry, url, data } = config
  // console.log('config', { method, retry, url, data })
  return config
}, (error) => {
  console.warn('错误的传参', error)
  // return Promise.reject(error)
})

// 返回 状态判断
axios.interceptors.response.use((response) => {
  let { data } = response
  // console.log('response', { data })
  return response
}, (err) => {
  console.log('err', err)
  var config = err.config
  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retry) return Promise.reject(err)
  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0
  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    // return Promise.reject(err)
    console.log('already tried ' + config.__retryCount + ' times')
    return
  }
  // Increase the retry count
  config.__retryCount += 1
  // Create new promise to handle exponential backoff
  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve()
    }, config.retryDelay || 3000)
  })
  // Return the promise in which recalls axios to retry the request
  return backoff.then(function () {
    return axios(config)
  })
})

const getParam = data => {
  return Object.entries(data).map(([key, value]) => {
    return `${key}=${value}`
  }).join('&')
}

export const getCaptcha = function() {
  axios.get(captchaImgApi)
}

const callApi = ({ endpoint, fetchOptions, callBack, retry }) => {
  if (retry >= 0) {
    axios.defaults.retry = retry
  } else {
    axios.defaults.retry = 2
  }
  fetchOptions.data = Object.assign({}, fetchOptions.data, {platformKey, ua: Platform.OS, timeStamp: new Date().getTime()})
  let fullUrl = API_ROOT + endpoint
  if (fetchOptions.method && fetchOptions.method.toLowerCase() === 'post') {
    return axios.post(fullUrl, fetchOptions.data)
      .then(response => {
        let data = response.data || {}
        if (typeof callBack === 'function') {
          callBack(data)
        }
        return data
      })
  } else {
    fullUrl += '?' + getParam(fetchOptions.data)
    return axios.get(fullUrl)
      .then(response => {
        let data = response.data || {}
        if (typeof callBack === 'function') {
          callBack(data)
        }
        return data
      })
  }
}

export const CALL_API = 'Call API'
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') { // 非api获取就return previous dispatch action
    return next(action)
  }

  const { types } = callAPI
  const { endpoint } = callAPI
  const { fetchOptions } = callAPI
  const { callBack } = callAPI
  const { retry } = callAPI

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi({ endpoint, fetchOptions, callBack, retry }).then(
    response => {
      if (response.code === -200012 || response.code === -200010 || response.code === -200011 || response.code === -200014 || response.code === -20000) {
        next(actionWith({
          response,
          type: 'USERLOGINOUT_SUCCESS'
        }))
        return
      }
      next(actionWith({
        response,
        type: successType
      }))
    }
  ).catch(err => {
    console.log('err', err)
    next(actionWith({
      response: err || {},
      type: failureType
    }))
  })
}
