import axios from 'axios'
import { GET_USERS, SET_TRIE, USER_ERROR } from '../actions/types'

// Get users
export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    
    dispatch({
      type: GET_USERS,
      payload: res.data.users
    })
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    }) 
  }
}

// Set trie
export const setTrie = trie => dispatch => {
  dispatch({
    type: SET_TRIE,
    payload: trie
  })
}