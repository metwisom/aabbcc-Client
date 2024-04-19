import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export interface Post {
  aspect: string;
  value: string;
  time: string
}

export interface Auth {
  login: string;
  password: string;
}

type PostsResponse = {items: Post[]}

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:45214/'}),
  tagTypes: ['Post','Auth'],
  endpoints: (build) => ({
    getPosts: build.query<PostsResponse, void>({
      query: () => 'data',
      providesTags: (result) =>
        result
          ? [
            ...result.items.map(({aspect}) => ({type: 'Post' as const, aspect})),
            {type: 'Post', id: 'LIST'},
          ]
          : [{type: 'Post', id: 'LIST'}],
    }),
    addAuth: build.mutation<Auth, Partial<Auth>>({
      query: (body) => ({
        url: `auth`,
        method: 'POST',
        body,
        headers: {
          "Content-Type": "application/json",
          "test": "test1"
        }
      }),
      invalidatesTags: [{type: 'Auth', id: 'LIST'}],
    }),
    addPost: build.mutation<Auth, Partial<Auth>>({
      query: (body) => ({
        url: `posts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: 'Post', id: 'LIST'}],
    }),
    getPost: build.query<Post, string>({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{type: 'Post', id}],
    }),
    updatePost: build.mutation<void, Pick<Post, 'id'> & Partial<Post>>({
      query: ({id, ...patch}) => ({
        url: `posts/${id}`,
        method: 'PUT',
        body: patch,
      }),
      async onQueryStarted({id, ...patch}, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          api.util.updateQueryData('getPost', id, (draft) => {
            Object.assign(draft, patch);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, {id}) => [{type: 'Post', id}],
    }),
    deletePost: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [{type: 'Post', id}],
    }),
  }),
});

export const {
  useGetPostQuery,
  useGetPostsQuery,
  useAddAuthMutation,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = api;
