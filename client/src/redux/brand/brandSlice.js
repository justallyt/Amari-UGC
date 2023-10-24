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
               })
        })
})

export const {
     useGetAllCreatorsForBrandQuery,
     useGetAllAssetsForBrandQuery
} = brandSlice