import { apiSlice } from "../apiSlice";

export const adminSlice = apiSlice.injectEndpoints({
      endpoints: (builder) => ({
             //get all admin requests
             getAllRequests: builder.query({
                    query: () => ({
                           url: 'user/get-all-requests',
                           method: "GET"
                    })
             }),
             //Get all Brands
             getAllBrands: builder.query({
                    query: () => ({
                            url: 'user/getallbrands',
                            method: 'GET'
                    })
             }),
             //Get All Creators
             getAllCreators: builder.query({
                  query: () => ({
                         url: 'user/getallcreators',
                         method: 'GET'
                  })
             }),
             
      })
})

export const {
       useGetAllRequestsQuery
 } = adminSlice