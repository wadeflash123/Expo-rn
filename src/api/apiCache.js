import {
  AsyncStorage
} from 'react-native'
import storage from 'react-native-simple-store'

export default apiCache = (key, fetchFunc, cached = true) => {
  if (!cached) {
    console.log(`cached = false. get api data from network ————  key = ${key}`)
    return fetchFunc()
  }
  return storage.get(key).then(value => {
    if (value) {
      console.log(`get api data from storage ————  key = ${key}`)
      return value
    } else {
      return fetchFunc().then(value => {
        console.log(`get api data from network ————  key = ${key}`)
        storage.save(key, value)
        return value
      })
    }
  })
}