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
              likeUserAsset: builder.mutation({
                     query: (payload) => ({
                            url: '/asset/like-asset', 
                            method: 'PUT',
                            body: payload
                     }),
                     invalidatesTags: ['Assets']
              }),
              bookmarkUserAsset: builder.mutation({
                        query: (payload) => ({
                              url: '/asset/bookmark-asset',
                              method: "PUT",
                              body: payload
                        }),
                        invalidatesTags: ['Assets']
              })
       })
})

export const { 
       useGetUserAssetsQuery,
       useLikeUserAssetMutation,
       useBookmarkUserAssetMutation
} =  assetsSlice