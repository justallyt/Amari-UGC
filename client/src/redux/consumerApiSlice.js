import { apiSlice } from "./apiSlice";

const CONSUMER_URL = 'http://localhost:8080/api/consumer'

export const consumerApiSlice = apiSlice.injectEndpoints({
     endpoints: (builder) => ({
          login: builder.mutation({
                query: (data) => ({
                     url: `${CONSUMER_URL}/login`,
                     method: 'POST',
                     body: data
                })
          }),
          register: builder.mutation({
                 query: (data) => ({
                       url: `${CONSUMER_URL}/register`,
                       method: "POST",
                       body: data
                 })
          })
     })
})

export const { useLoginMutation, useRegisterMutation } = consumerApiSlice