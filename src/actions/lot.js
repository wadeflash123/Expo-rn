import { CALL_API } from '../middleware/api'
import * as ActionTypes from './actionTypes'

// 查询所有彩种
export const fetchSysLottery = ({data, cb}) => ({
  [CALL_API]: {
    types: [ActionTypes.SYSLOTTERY_REQUEST, ActionTypes.SYSLOTTERY_SUCCESS, ActionTypes.SYSLOTTERY_FAILURE],
    endpoint: '/order/queryLotter',
    fetchOptions: {
      method: 'POST',
      data
    },
    callBack: cb
  }
})

export const A_sysLottery = ({data, cb}) => (dispatch) => {
  return dispatch(fetchSysLottery({data, cb}))
}
