import { apiSlice } from "./apiSlice";

export const usersSlice = apiSlice.injectEndpoints({
        endpoints: (builder) => ({
             loginUser: builder.mutation({
                      query: (payload) => ({
                              url: `login`,
                              method: 'POST',
                              body: payload,
                      })
              }),
             createUser: builder.mutation({
                    query: (payload) => ({
                          url: `register`,
                          method: 'POST',
                          body: payload,
                    })
              }),
             logoutUser: builder.mutation({
                    query: (payload) => ({
                           url: 'logout',
                           method: "POST",
                           body: payload
                    })
              })
        })
})

export const { useLoginUserMutation, useCreateUserMutation, useLogoutUserMutation } = usersSlice;