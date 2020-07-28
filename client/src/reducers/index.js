import { combineReducers } from 'redux'
import user from './user'
import visualise from './visualise'
import alert from './alert'

export default combineReducers({
  user,
  visualise,
  alert
})