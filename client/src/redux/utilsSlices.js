import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
      videoUploadProgress: 0,
      isModalOpen: false,
      videos: localStorage.getItem('Videos') ? JSON.parse(localStorage.getItem('Videos')) : null,
      brands: null
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
              }
        }
})

export const { 
      setUploadProgress, 
      clearUploadProgress,
      openModal, closeModal, 
      setVideoAssets,
       setPulledBrands
} = utilsSlice.actions
export default utilsSlice.reducer;