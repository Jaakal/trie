import { GET_USERS, SET_TRIE, USER_ERROR } from '../actions/types'

const initialState = {
  users: [],
  trie: {
    wordCount: 0
  },
  loading: true,
  error: {}
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      }
    case SET_TRIE:
      return {
        ...state,
        trie: payload
      }
    case USER_ERROR:
      return {
        ...state,
        error: payload,
        laoding: false
      }
    default:
      return state
  }
}