import * as ActionTypes from '../actions/actionTypes'

const initState = {
  sysLottery: []
}

export default user = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.SYSLOTTERY_SUCCESS:
      return Object.assign({}, state, {sysLottery: action.response.data})
    default:
      return state
  }
}