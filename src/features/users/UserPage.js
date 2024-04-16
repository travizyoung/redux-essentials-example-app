import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserById } from './usersSlice'
import {
  selectAllPosts,
  fetchPosts,
  selectPostsByUser,
} from '../posts/postsSlice'

export const UserPage = ({ match }) => {
  const postsStatus = useSelector((state) => state.posts.status)
  const dispatch = useDispatch()

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])

  const { userId } = match.params
  const user = useSelector((state) => selectUserById(state, userId))

  if (!user) {
    return <div>User not found!</div>
  }

  // const postsForUser = useSelector((state) => selectPostsByUser(state, userId))

  // This will rerender this page
  const postsForUser = useSelector((state) => selectPostsByUser(state, userId))

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>

      <ol>{postTitles}</ol>
    </section>
  )
}
