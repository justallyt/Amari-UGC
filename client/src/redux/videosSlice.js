import axios from 'axios'
import { apiSlice } from "./apiSlice";
import { setUploadProgress } from './utilsSlices';

export const videosSlice = apiSlice.injectEndpoints({
       endpoints: (builder) => ({
              createAsset: builder.mutation({
                     queryFn: async (data, api) => {
                               try{
                                         const result = await axios.post(import.meta.env.VITE_API_URL, data, {
                                                   onUploadProgress: amt => {
                                                          let uploadProgress = Math.round((100 * amt.loaded) / amt.total);
                                                          api.dispatch(setUploadProgress(uploadProgress))
                                                   }
                                   }, {  headers: { 'Content-Type': 'application/json' }, 'Access-Control-Allow-Origin': 'http://localhost:8080'})
                                         return result;
                               }catch(error){
                                     console.log(error)
                               }
                     }
               })
       })
})

export const { useCreateAssetMutation  } = videosSlice