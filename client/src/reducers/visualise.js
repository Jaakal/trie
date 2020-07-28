import { SET_NAME_TO_VISUALISE } from '../actions/types'

const initialState = {
  nameToVisualise: ''
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_NAME_TO_VISUALISE:
      return {
        ...state,
        nameToVisualise: payload
      }
    default:
      return state
  }
}