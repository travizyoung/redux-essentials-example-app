import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const REGISTED_TAGS = {
  POST: 'Post',
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  tagTypes: [REGISTED_TAGS.POST],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: [REGISTED_TAGS.POST],
    }),

    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
    }),

    addNewPost: builder.mutation({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: [REGISTED_TAGS.POST],
    }),

    editPost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PATCH',
        body: post,
      }),
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useEditPostMutation,
  useAddNewPostMutation,
} = apiSlice
