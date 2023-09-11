import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const requestsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.requestsName.localeCompare(a.requestsName), //might change logic here
});

const initialState = requestsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRequests: builder.query({
      query: () => "/requests",
      transformResponse: (responseData) => {
        // let min = 1;
        const loadedRequests = responseData.map((request) => {
          // if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
          // if (!post?.reactions) post.reactions = {
          //     thumbsUp: 0,
          //     wow: 0,
          //     heart: 0,
          //     rocket: 0,
          //     coffee: 0
          // }
          return request;
        });
        return requestsAdapter.setAll(initialState, loadedRequests);
      },
      providesTags: (result, error, arg) => [
        { type: "Request", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Request", id })),
      ],
    }),
    getRequestById: builder.query({
      query: (id) => `/requests/?userId=${id}`, //might change url here
      transformResponse: (responseData) => {
        // let min = 1;
        const loadedRequests = responseData.map((request) => {
          // if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
          // if (!post?.reactions) post.reactions = {
          //     thumbsUp: 0,
          //     wow: 0,
          //     heart: 0,
          //     rocket: 0,
          //     coffee: 0
          // }
          return request;
        });
        return requestsAdapter.setAll(initialState, loadedRequests);
      },
      providesTags: (result, error, arg) => [
        ...result.ids.map((id) => ({ type: "Request", id })),
      ],
    }),
    // addNewPost: builder.mutation({
    //     query: initialPost => ({
    //         url: '/posts',
    //         method: 'POST',
    //         body: {
    //             ...initialPost,
    //             userId: Number(initialPost.userId),
    //             date: new Date().toISOString(),
    //             reactions: {
    //                 thumbsUp: 0,
    //                 wow: 0,
    //                 heart: 0,
    //                 rocket: 0,
    //                 coffee: 0
    //             }
    //         }
    //     }),
    //     invalidatesTags: [
    //         { type: 'Post', id: "LIST" }
    //     ]
    // }),
    // updatePost: builder.mutation({
    //     query: initialPost => ({
    //         url: `/posts/${initialPost.id}`,
    //         method: 'PUT',
    //         body: {
    //             ...initialPost,
    //             date: new Date().toISOString()
    //         }
    //     }),
    //     invalidatesTags: (result, error, arg) => [
    //         { type: 'Post', id: arg.id }
    //     ]
    // }),
    // deletePost: builder.mutation({
    //     query: ({ id }) => ({
    //         url: `/posts/${id}`,
    //         method: 'DELETE',
    //         body: { id }
    //     }),
    //     invalidatesTags: (result, error, arg) => [
    //         { type: 'Post', id: arg.id }
    //     ]
    // }),
    // addReaction: builder.mutation({
    //     query: ({ postId, reactions }) => ({
    //         url: `posts/${postId}`,
    //         method: 'PATCH',
    //         // In a real app, we'd probably need to base this on user ID somehow
    //         // so that a user can't do the same reaction more than once
    //         body: { reactions }
    //     }),
    //     async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }) {
    //         // `updateQueryData` requires the endpoint name and cache key arguments,
    //         // so it knows which piece of cache state to update
    //         const patchResult = dispatch(
    //             // updateQueryData takes three arguments: the name of the endpoint to update, the same cache key value used to identify the specific cached data, and a callback that updates the cached data.
    //             extendedApiSlice.util.updateQueryData('getPosts', 'getPosts', draft => {
    //                 // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
    //                 const post = draft.entities[postId]
    //                 if (post) post.reactions = reactions
    //             })
    //         )
    //         try {
    //             await queryFulfilled
    //         } catch {
    //             patchResult.undo()
    //         }
    //     }
    // })
  }),
});

export const {
  useGetRequestsQuery,
  useGetRequestByIdQuery,
  // useAddNewPostMutation,
  // useUpdatePostMutation,
  // useDeletePostMutation,
  // useAddReactionMutation
} = extendedApiSlice;
