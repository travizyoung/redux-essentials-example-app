import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      // prepare function is used to prepare the data before it is dispatched,
      // it can generate random data and return it
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        }
      },
    },

    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },

    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
    // .addMatcher()
    // .addDefaultCase()

    builder.addCase(addNewPost.fulfilled, (state, action) => {
      state.posts.push(action.payload)
    })
  },
})

export const selectAllPosts = (state) => state.posts.posts

export const selectPostById = (postId) => (state) =>
  state.posts.posts.find((post) => post.id === postId)

export const selectPostsByUser = createSelector(
  ([selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)),
)

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

/**
 * createAsyncThunk accepts two arguments
 *  1. A string that will be used as the prefix for the generated action types
 *  2. A "payload creator" callback function that should return a Promise containing some data,
 *     or rejected Promise with an error
 */
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await client.post('/fakeApi/posts', initialPost)
    return response.data
  },
)
