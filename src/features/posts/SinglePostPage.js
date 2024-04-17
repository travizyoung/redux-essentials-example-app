import React from 'react'
import { useGetPostQuery } from '../api/apiSlice'
import { Spinner } from '../../components/Spinner'

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId)

  let content

  if (isFetching) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
      </article>
    )
  }

  return <section>{content}</section>
}
