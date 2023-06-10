import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
        baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/user/'}),
        tagTypes: ['User'],
        endpoints: (build) => ({
              createUser: build.mutation({
                    query: (payload) => ({
                          url: `register`,
                          method: 'POST',
                          body: payload,
                    })
              }),
              loginUser: build.mutation({
                      query: (payload) => ({
                              url: `login`,
                              method: 'POST',
                              body: payload
                      })
              })
        })
})

export const { useCreateUserMutation, useLoginUserMutation } = apiSlice