import { apiSlice } from "../apiSlice";

export const brandSlice = apiSlice.injectEndpoints({
        endpoints: (builder) => ({
               getAllCreatorsForBrand: builder.query({
                       query: () => ({
                              url: 'brand/get-all-creators',
                              method: 'GET'
                       }),
                       providesTags: ['Creators']
               }),
               getAllAssetsForBrand: builder.query({
                       query: () => ({
                              url: 'brand/get-brand-assets',
                              methods: 'GET'
                       }),
                       providesTags: ['Assets']
               }),
               getAllAssetsByACreator: builder.query({
                     query: (id) => ({
                            url: `brand/get-all-assets-by-a-creator/${id}`,
                            method: "GET",
                     })
               }),
               createRewardForCreators: builder.mutation({
                       query: (payload) => ({
                              url: "brand/create-reward",
                              method: "POST",
                              body: payload
                       }),
                       invalidatesTags: ['Rewards']
               }),
               getAllCreatedRewards: builder.query({
                     query: () => ({
                            url: "brand/get-all-brand-rewards",
                            method: "GET"
                     }),
                     providesTags: ['Rewards']
               }),
               deleteBrandReward: builder.mutation({
                     query: (payload) => ({
                            url: "brand/delete-reward",
                            method: "DELETE",
                            body: payload
                     }),
                     invalidatesTags: ['Rewards']
               }),
               editBrandReward: builder.mutation({
                        query: (payload) => ({
                                url: "brand/edit-reward",
                                method: "PUT",
                                body: payload
                        }),
                        invalidatesTags: ['Rewards']
               }),
               confirmCreatorRewards: builder.mutation({
                       query: (payload) => ({
                              url: "brand/confirm-creator-rewards",
                              method: "PUT",
                              body: payload
                       }),
                       invalidatesTags: ['Rewards']
               })
        })
})

export const {
     useGetAllCreatorsForBrandQuery,
     useGetAllAssetsForBrandQuery,
     useGetAllAssetsByACreatorQuery,
     useCreateRewardForCreatorsMutation,
     useGetAllCreatedRewardsQuery,
     useDeleteBrandRewardMutation,
     useEditBrandRewardMutation,
     useConfirmCreatorRewardsMutation
} = brandSlice