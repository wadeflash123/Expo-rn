const initState = {
  audioSwitch: true
}

export default user = (state = initState, action) => {
  switch (action.type) {
    case 'SET_AUDIO_SWITCH':
      return Object.assign({}, state, {audioSwitch: action.payload})
    default:
      return state
  }
}