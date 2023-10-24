import { apiSlice } from "../apiSlice";

export const brandSlice = apiSlice.injectEndpoints({
        endpoints: (builder) => ({
               getAllCreatorsForBrand: builder.query({
                       query: () => ({
                              url: 'brand/get-all-creators',
                              method: 'GET'
                       }),
                       providesTags: ['Creators']
               })
        })
})

export const {
     useGetAllCreatorsForBrandQuery
} = brandSlice