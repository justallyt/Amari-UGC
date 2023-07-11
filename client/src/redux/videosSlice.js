import axios from 'axios'
import { apiSlice } from "./apiSlice";
import { setUploadProgress } from './utilsSlices';

export const videosSlice = apiSlice.injectEndpoints({
       endpoints: (builder) => ({
              createAsset: builder.mutation({
                     queryFn: async (data,api) => {
                               try{ 
                                         const result = await axios.post(
                                                 import.meta.env.VITE_API_URL, 
                                                 data,
                                                 {
                                                        withCredentials: true,
                                                        headers: { "Content-Type": 'multipart/form-data'},
                                                        onUploadProgress: (upload) => {
                                                               let percent = Math.round((upload.loaded * 100) / upload.total)
                                                               
                                                               api.dispatch(setUploadProgress(percent))
                                                        }
                                                 },
                                           )
                                          
                                         return {data: result.data};
                               }catch(axiosError){
                                   let err = axiosError
                                   return {
                                         error: {
                                           status: err.response?.status,
                                           data: err.response?.data || err.message,
                                         },
                                   }               
                               }
                     }
               }),
              getUserAssets: builder.query({
                     query: () => ({
                            url: '/video/user-assets',
                            method: 'GET'
                     })
              })
       })
})

export const { useCreateAssetMutation, useGetUserAssetsQuery } = videosSlice