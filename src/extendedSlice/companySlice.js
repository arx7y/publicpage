import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { createSelector } from "@reduxjs/toolkit";

const companiesAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.companyName.localeCompare(a.companyName),
});

const initialState = companiesAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: () => "/compaines",
      transformResponse: (responseData) => {
        // let min = 1;
        const loadedCompanies = responseData.map((company) => {
          // if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
          // if (!post?.reactions) post.reactions = {
          //     thumbsUp: 0,
          //     wow: 0,
          //     heart: 0,
          //     rocket: 0,
          //     coffee: 0
          // }
          return company;
        });
        return companiesAdapter.setAll(initialState, loadedCompanies);
      },
      providesTags: (result, error, arg) => [
        { type: "Company", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Company", id })),
      ],
    }),
    getCompanyById: builder.query({
      query: (id) => `/posts/?userId=${id}`,
      transformResponse: (responseData) => {
        // let min = 1;
        const loadedCompanies = responseData.map((company) => {
          // if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
          // if (!post?.reactions) post.reactions = {
          //     thumbsUp: 0,
          //     wow: 0,
          //     heart: 0,
          //     rocket: 0,
          //     coffee: 0
          // }
          return company;
        });
        return companiesAdapter.setAll(initialState, loadedCompanies);
      },
      providesTags: (result, error, arg) => [
        ...result.ids.map((id) => ({ type: "Company", id })),
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

export const selectCompaniesResult =
  extendedApiSlice.endpoints.getCompanies.select();

// Creates memoized selector
const selectCompaniesData = createSelector(
  selectCompaniesResult,
  (companiesResult) => companiesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllCompanies,
  selectById: selectCompanyById,
  selectIds: selectCompanyIds,
  // Pass in a selector that returns the posts slice of state
} = companiesAdapter.getSelectors(
  (state) => selectCompaniesData(state) ?? initialState
);

export const {
  useGetCompaniesQuery,
  useGetCompanyByIdQuery,
  // useAddNewPostMutation,
  // useUpdatePostMutation,
  // useDeletePostMutation,
  // useAddReactionMutation
} = extendedApiSlice;
