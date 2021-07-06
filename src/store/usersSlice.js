import { createSlice } from '@reduxjs/toolkit'
import {_getUsers} from '../_DATA'

const initialState = { 
    users: {}
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
      getUsers (state, action) {
          state.users = action.payload
      },
  },
})

export const fetchUsers = () => {
    return async dispatch => {
        _getUsers().then(data => dispatch(usersSlice.actions.getUsers(data)))
    }
}

export const usersActions = usersSlice.actions
export default usersSlice.reducer