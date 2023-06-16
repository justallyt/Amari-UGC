import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: '/api/user/'});


export const apiSlice = createApi({
         baseQuery,
         tagTypes: ['User'],
         endpoints: () => ({})
})
// export const apiSlice = createApi({
//         baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/user/'}),
//         tagTypes: ['User'],
//         prepareHeaders: (headers) => { return headers },
//         endpoints: (build) => ({
//               createUser: build.mutation({
//                     query: (payload) => ({
//                           url: `register`,
//                           method: 'POST',
//                           body: payload,
//                     })
//               }),
//               loginUser: build.mutation({
//                       query: (payload) => ({
//                               url: `login`,
//                               method: 'POST',
//                               body: payload,
                        
//                       })
//               }),
//               getUserProfile: build.mutation({
//                      query: () => ({
//                             url: 'profile',
//                             method: 'GET'
//                      })
//               }),
//               logoutUser: build.mutation({
//                     query: (payload) => ({
//                            url: 'logout',
//                            method: "POST",
//                            body: payload
//                     })
//               })
//         })
// })

// export const { useCreateUserMutation, useLoginUserMutation,useGetUserProfileMutation, useLogoutUserMutation } = apiSlice