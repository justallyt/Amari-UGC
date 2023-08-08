import { apiSlice } from "../apiSlice";

export const adminSlice = apiSlice.injectEndpoints({
      endpoints: (builder) => ({
             //get all admin requests
             getAllRequests: builder.query({
                    query: () => ({
                           url: 'user/get-all-requests',
                           method: "GET"
                    }),
                    providesTags: ['Request']
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
             //Get all approved requests
             getApprovedCreators: builder.query({
                   query: () => ({
                           url: 'user/approved-requests',
                           method: 'GET'
                   }),
                   providesTags: ['Request']
             }),
             // Approve a creator
             approveCreator: builder.mutation({
                   query: (payload) => ({
                           url: 'user/approve-creator',
                           method: 'PUT',
                           body: payload
                   }),
                   invalidatesTags: ['Request']
             })
      })
})

export const {
       useGetAllRequestsQuery,
       useGetAllBrandsQuery,
       useGetAllCreatorsQuery,
       useGetApprovedCreatorsQuery,
       useApproveCreatorMutation
 } = adminSlice