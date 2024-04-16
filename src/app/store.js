import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'
import notificationsSlice from '../features/notifications/notificationsSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsSlice,
  },
})

// const thunk = (dispatch, getState) => (next) => (action) => {
//   if (typeof action === 'function') {
//     return action(dispatch, getState)
//   } else {
//     return next(action)
//   }
// }

// const exampleThunkFunction = (dispatch, getState) => {
//   const stateBefore = getState()
//   console.log(`Counter before: ${stateBefore.counter}`)
//   dispatch(increment())
//   const stateAfter = getState()
//   console.log(`Counter after: ${stateAfter.counter}`)
// }

// store.dispatch(exampleThunkFunction)

// For consistency 换一种写法而已，action可以用action creator, 那thunk也可以有thunk creator
// const exampleThunkCreator =
//   (...args) =>
//   (dispatch, getState) => {
//     const stateBefore = getState()
//     console.log(`Counter before: ${stateBefore.counter}`)
//     dispatch(increment())
//     const stateAfter = getState()
//     console.log(`Counter after: ${stateAfter.counter}`)
//   }

// exmapleThunkCreator() is still a function
// store.dispatch(exampleThunkCreator())

// const getRepoDetailsStarted = () => ({
//   type: 'repoDetails/fetchStarted',
// })

// const getRepoDetailsSuccess = (repoDetails) => ({
//   type: 'repoDetails/fetchSucceeded',
//   payload: repoDetails,
// })

// const getRepoDetailsFailed = (error) => ({
//   type: 'repoDetails/fetchFailed',
//   error,
// })

// const fetchIssuesCount = (org, repo) => async (dispatch, _) => {
//   dispatch(getRepoDetailsStarted())

//   try {
//     // This is the only async action in our app
//     const repoDetails = await getRepoDetails(org, repo)
//     dispatch(getRepoDetailsSuccess(repoDetails))
//   } catch (err) {
//     dispatch(getRepoDetailsFailed(err.toString()))
//   }
// }
