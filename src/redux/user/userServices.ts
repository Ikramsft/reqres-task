import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { APP_BASE_URL, config } from "../../config";

const usersAdapter = createEntityAdapter({
  selectId: (post: any) => post.id,
  sortComparer: (a, b) => b.createdAt - a.createdAt
});
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: APP_BASE_URL
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: config.LOGIN,
        method: "POST",
        body: data
      })
    }),
    register: builder.mutation({
      query: (data) => ({
        url: config.REGISTER,
        method: "POST",
        body: data
      })
    }),
    users: builder.query({
      query: (page = 1) => `${config.USERS}?page=${page}`
    }),
    fetchUsers: builder.query({
      keepUnusedDataFor: 600, // Keep unused for longer,
      query: (page) => {
        return `${config.USERS}?page=${page}`;
      },
      transformResponse: (response: any) => {
        return usersAdapter.addMany(
          usersAdapter.getInitialState({
            hasMorePages: true
          }),
          response.data
        );
      },
      async onQueryStarted(page, { queryFulfilled, dispatch }) {
        if (!page) {
          return;
        }
        const { data } = await queryFulfilled;
        if (data) {
          dispatch(
            userApi.util.updateQueryData("fetchUsers", 1, (draft) => {
              usersAdapter.addMany(draft, usersSelectors.selectAll(data));
              draft.hasMorePages;
            })
          );

          if (page > 1) {
            dispatch(
              userApi.util.updateQueryData("fetchUsers", page, (draft: any) => {
                draft = usersAdapter.getInitialState();
              })
            );
          }
        }
      }
    })
  })
});

export const {
  useLoginMutation,
  useUsersQuery,
  useRegisterMutation,
  useLazyFetchUsersQuery
} = userApi;
const usersSelectors = usersAdapter.getSelectors((state: any) => state);
export { usersSelectors, usersAdapter };
