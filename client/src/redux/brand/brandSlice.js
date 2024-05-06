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
               })
        })
})

export const {
     useGetAllCreatorsForBrandQuery,
     useGetAllAssetsForBrandQuery,
     useGetAllAssetsByACreatorQuery
} = brandSlice