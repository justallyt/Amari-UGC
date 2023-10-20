import { apiSlice } from "./apiSlice";

export const assetsSlice = apiSlice.injectEndpoints({
       endpoints: (builder) => ({
              getUserAssets: builder.query({
                     query: () => ({
                            url: '/asset/user-assets',
                            method: 'GET'
                     }),
                     providesTags: ['Assets']
              }),
              // createAsset: builder.mutation({
              //         queryFn: async (data) => {
              //                 try{
              //                        const result = await axios.post(
              //                             import.meta.env.VITE_API_URL,
              //                             data,
              //                             { withCredentials: true, headers: {"Content-Type": 'multipart/form-data' } }
              //                        )

              //                        return { data: result }
              //                 } catch(axiosError) {
              //                         return axiosError;
              //                 }
              //         },
              //         invalidatesTags: ['Assets']
              // })
       })
})

export const { useCreateAssetMutation, useGetUserAssetsQuery } =  assetsSlice