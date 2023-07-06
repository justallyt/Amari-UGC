import { apiSlice } from "./apiSlice";

export const usersSlice = apiSlice.injectEndpoints({
        endpoints: (builder) => ({
             loginUser: builder.mutation({
                      query: (payload) => ({
                              url: `user/login`,
                              method: 'POST',
                              body: payload,
                      })
              }),
             createUser: builder.mutation({
                    query: (payload) => ({
                          url: `user/register`,
                          method: 'POST',
                          body: payload,
                    })
              }),
            getUserProfile: builder.query({
                  query: () => ({
                          url: 'user/profile',
                          method: "GET",
                  })
            }), 
            updateUserProfile: builder.mutation({
                   query: (payload) => ({
                          url: 'user/update-profile',
                          method: 'PUT',
                          body: payload
                   })
            }),
             logoutUser: builder.mutation({
                    query: (payload) => ({
                           url: 'user/logout',
                           method: "POST",
                           body: payload
                    })
              })
        })
})

export const { useLoginUserMutation, useCreateUserMutation,useUpdateUserProfileMutation, useGetUserProfileQuery, useLogoutUserMutation } = usersSlice;