const showLog = __DEV__

const API_ROOT = 'http://tianxiangh5.qmuitest.com/qm'

export const platformKey = '3LK0V/qWsjnMe935IUgNzw=='

const RES_CODE = 0

const getFetch = (url, cached) => {
  const fetchFunc = () => {
    return fetch(url, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
      }
    }).then(convertRespToJson)
  }
  return apiCache(url, fetchFunc, cached).then(defaultAnalyse)
}

const postFetch = url => jsonData => {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json'
    },
    body: jsonData
  }).then(convertRespToJson).then(defaultAnalyse)
}

const getParam = data => {
  return Object.entries(data).map(([key, value]) => {
    return `${key}=${value}`
  }).join('&')
}

/**
 * @param cached 是否优先本地缓存
 * @param path 相对路径
 */
const get = cached => (path, data) => {
  let url = `${API_ROOT}${path}?platformKey=${platformKey}`
  if (data) {
    url.append(`&${getParam(data)}`)
  }
  return loggerWrap(`GET ${url}`)(() => {
    return getFetch(url, cached)
  })
}

/**
 * @param path 相对路径
 */
export const post = path => data => {
  // let jsonData = JSON.stringify(Object.assign({}, data, {platformKey: platformKey}))
  let jsonData = data
  let url = API_ROOT + path
  return loggerWrap(`POST ${url} ${jsonData}`)(() => {
    return postFetch(url)(jsonData)
  })
}

/**
 * @param requestInfo 请求信息
 */
const loggerWrap = requestInfo => fetchFunc => {
  if (showLog) {
    let startTime = new Date().getTime()
    return fetchFunc().then(result => {
      console.log(`${requestInfo}  success  result = ${JSON.stringify(result)} cost time = ${new Date().getTime() - startTime}ms`)
      return result
    }).catch(err => {
      console.warn(`${requestInfo} ${err}`)
      return Promise.reject(err)
    })
  }
  return fetchFunc()
}

const convertRespToJson = response => {
  return response.json()
}

const defaultAnalyse = response => {
  if (response.code === RES_CODE) {
    return response
  } else {
    console.warn(response.message)
    throw response.message
  }
}

export const getFetchFromCache = get(true);//缓存
export const getFetchNeverCached = get(false);//不缓存