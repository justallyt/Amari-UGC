import { apiSlice } from "../apiSlice";

export const adminSlice = apiSlice.injectEndpoints({
      endpoints: (builder) => ({
             //get all admin requests
             getAllRequests: builder.query({
                    query: () => ({
                           url: 'user/get-all-requests',
                           method: "GET"
                    })
             })
      })
})

export const {
       useGetAllRequestsQuery
 } = adminSlice