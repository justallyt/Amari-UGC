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
             // Approve a creator
             approveCreator: builder.mutation({
                   query: (payload) => ({
                           url: 'user/approve-creator',
                           method: 'PUT',
                           body: payload
                   })
             })
      })
})

export const {
       useGetAllRequestsQuery,
       useGetAllBrandsQuery,
       useGetAllCreatorsQuery,
       useApproveCreatorMutation
 } = adminSlice