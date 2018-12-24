import { API_ROOT, platformKey, RES_CODE } from '../api/apiConfig'

const getParam = data => {
  return Object.entries(data).map(([key, value]) => {
    return `${key}=${value}`
  }).join('&')
}

const callApi = (endpoint, fetchOptions, callBack) => {
  fetchOptions = Object.assign({}, fetchOptions, {credentials: 'same-origin'})
  let fullUrl = API_ROOT + endpoint
  if (fetchOptions.method.toLowerCase() === 'get') {
    fullUrl = fullUrl + '?platformKey=' + platformKey
    if (fetchOptions.data) {
      fullUrl += '&' + getParam(fetchOptions.data)
    }
    return fetch(fullUrl, fetchOptions)
      .then(response => 
        response.json().then(json => {
          if (!response.ok) { // 非 200
            return Promise.reject(json)
          }
          if (typeof callBack === 'function') {
            callBack(json)
          }
          return json
        }))
  } else if (fetchOptions.method.toLowerCase() === 'post') {
    fetchOptions.body = JSON.stringify(Object.assign({}, fetchOptions.body, {platformKey: platformKey}))
    return fetch(fullUrl, fetchOptions)
      .then(response => 
        response.json().then(json => {
          if (!response.ok) {
            return Promise.reject(json)
          }
          if (typeof callBack === 'function') {
            callBack(json)
          }
          return json
        }))
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

  return callApi(endpoint, fetchOptions, callBack).then(
    response => {
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
