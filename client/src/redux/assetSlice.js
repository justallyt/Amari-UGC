
import { apiSlice } from "./apiSlice";

export const videosSlice = apiSlice.injectEndpoints({
       endpoints: (builder) => ({
              getUserAssets: builder.query({
                     query: () => ({
                            url: '/asset/user-assets',
                            method: 'GET'
                     })
              })
       })
})

export const { useCreateAssetMutation, useGetUserAssetsQuery } = videosSlice