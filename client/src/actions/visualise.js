import { SET_NAME_TO_VISUALISE } from '../actions/types'

export const setNameToVisualise = name => dispatch => {
  dispatch({
    type: SET_NAME_TO_VISUALISE,
    payload: name
  })
}