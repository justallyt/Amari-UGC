import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
        baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/consumer/'}),
        tagTypes: ['Consumer'],
        endpoints: (build) => ({
              createConsumer: build.mutation({
                    query: (payload) => ({
                          url: `register`,
                          method: 'POST',
                          body: payload,
                    })
              })
        })
})

export const { useCreateConsumerMutation } = apiSlice