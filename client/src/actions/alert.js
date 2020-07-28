import { v4 as uuidv4 } from 'uuid'
import { SET_ALERT, REMOVE_ALERT, FLUSH_ALL_ALERTS } from './types'

export const setAlert = (msg, alertType = 'neutral') => dispatch => {
  const id = uuidv4()
  
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  })
}

export const removeAlert = id => dispatch => {
  dispatch({ 
    type: REMOVE_ALERT, 
    payload: id 
  })
}

export  const flushAllAlerts = () => dispatch => {
  dispatch({
    type: FLUSH_ALL_ALERTS
  })
}