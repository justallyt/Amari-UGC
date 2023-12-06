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
              }),
              commentOnAsset: builder.mutation({
                     query: (payload) => ({
                              url: '/asset/comment',
                              method: 'POST',
                              body: payload
                     }),
                     invalidatesTags: ['Comment']
              }),
              getAssetComments: builder.query({
                        query: (id) => ({
                              url: `/asset/get-asset-comments/${id}`,
                              method: "GET"
                        }),
                        providesTags: ['Comment']
              }),
              replyOnComment: builder.mutation({
                     query: (payload) => ({
                             url: '/asset/reply',
                             method: 'POST',
                             body: payload
                     }),
                     invalidatesTags: ['Comment']
              })
       })
})

export const { 
       useGetUserAssetsQuery,
       useLikeUserAssetMutation,
       useBookmarkUserAssetMutation,
       useCommentOnAssetMutation,
       useGetAssetCommentsQuery,
       useReplyOnCommentMutation
} =  assetsSlice