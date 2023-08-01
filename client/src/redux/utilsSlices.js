import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
      videoUploadProgress: 0,
      isModalOpen: false,
      videos: localStorage.getItem('Videos') ? JSON.parse(localStorage.getItem('Videos')) : null,
      brands: null,
      requests: null
}
export const utilsSlice = createSlice({
        name: 'uploadSlice',
        initialState,
        reducers: {
              setUploadProgress: (state, action) => {
                     return {
                           ...state,
                          videoUploadProgress: action.payload
                     }
              },
              clearUploadProgress: (state) => {
                      state.videoUploadProgress = 0
              },

              //modal
              openModal: (state) => {
                  state.isModalOpen = true
              },
              closeModal: (state) => {
                  state.isModalOpen = false
              },

              //set Video Assets
              setVideoAssets: (state, action) => {
                     state.videos = action.payload
                     localStorage.setItem('Videos', JSON.stringify(action.payload))
              },

              //set brands
              setPulledBrands: (state, action) => {
                      state.brands = action.payload
              },

              //check requested brands
             setRequestedBrands: (state, action) => {
                    state.requests = action.payload
             },

             clearUtils: (state) => {
                       state.videos = null;
                       state.brands = null;
                       state.requests = null;
                       localStorage.removeItem("Videos")
             }
        }
})

export const { 
      setUploadProgress, 
      clearUploadProgress,
      openModal, closeModal, 
      setVideoAssets,
       setPulledBrands,
       setRequestedBrands,
       clearUtils
} = utilsSlice.actions
export default utilsSlice.reducer;