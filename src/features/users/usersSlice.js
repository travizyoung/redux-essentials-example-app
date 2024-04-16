import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // this equals to ```state = action.payload```
      return action.payload
    })
  },
})

export const selectAllUsers = (state) => state.users

export const selectUserById = (userId) => (state) =>
  state.users.find((user) => user.id === userId)

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

export default usersSlice.reducer
