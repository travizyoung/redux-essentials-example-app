import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById, selectUserIds } from './usersSlice'

const UserExcerpt = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId))

  return (
    <li>
      <Link to={`/users/${userId}`}>{user.name}</Link>
    </li>
  )
}

export const UsersList = () => {
  const userIds = useSelector(selectUserIds)

  const renderedUsers = userIds.map((userId) => (
    <UserExcerpt key={userId} userId={userId} />
  ))

  return (
    <section>
      <h2>Users</h2>
      <ul>{renderedUsers}</ul>
    </section>
  )
}
