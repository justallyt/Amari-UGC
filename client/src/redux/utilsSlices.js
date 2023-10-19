import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
      videoUploadProgress: 0,
      isModalOpen: false,
      videos: localStorage.getItem('Videos') ? JSON.parse(localStorage.getItem('Videos')) : null,
      brands: null,
      requests: null,
      userBrands: localStorage.getItem('UserBrands') ? JSON.parse(localStorage.getItem("UserBrands")) : null,
      availableBrands: localStorage.getItem("AvailableBrands") ? JSON.parse(localStorage.getItem("AvailableBrands")): null
}
export const utilsSlice = createSlice({
        name: 'UtilsSlice',
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

             //Set user Brands
             setUserApprovedBrands: (state, action) => {
                   state.userBrands = action.payload
                   localStorage.setItem('UserBrands', JSON.stringify(action.payload))
             },
            setAvailableBrands: (state, action) => {
                    state.availableBrands = action.payload
                    localStorage.setItem("AvailableBrands", JSON.stringify(action.payload))
            },
            clearUtils: (state) => {
                       state.videos = null;
                       state.brands = null;
                       state.requests = null;
                       state.userBrands = null;
                       localStorage.clear();
             },

        }
})

export const { 
      setUploadProgress, 
      clearUploadProgress,
      openModal, closeModal, 
      setVideoAssets,
       setPulledBrands,
       setRequestedBrands,
       setUserApprovedBrands,
       clearUtils,
       setAvailableBrands
} = utilsSlice.actions
export default utilsSlice.reducer;