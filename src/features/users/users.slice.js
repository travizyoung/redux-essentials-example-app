import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const users = createSlice({
  name: 'users',
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (_, action) => action.payload)
  },
})

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

export const selectAllUser = (state) => state.users

export const selectUserById = (userId) => (state) =>
  state.users.find((user) => user.id === userId)
