import { apiSlice } from "./apiSlice";

const CONSUMER_URL = '/api/consumer'

export const consumerApiSlice = apiSlice.injectEndpoints({
     endpoints: (builder) => ({
          login: builder.mutation({
                query: (data) => ({
                     url: `${CONSUMER_URL}/login`,
                     method: 'POST',
                     body: data
                })
          })
     })
})

export const { useLoginMutation } = consumerApiSlice