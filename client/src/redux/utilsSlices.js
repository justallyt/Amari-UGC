import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
      isModalOpen: false,
      assets: localStorage.getItem('Assets') ? JSON.parse(localStorage.getItem('Assets')) : null,
      brands: null,
      creators: null,
      requests: null,
      userBrands: localStorage.getItem('UserBrands') ? JSON.parse(localStorage.getItem("UserBrands")) : null,
      availableBrands: localStorage.getItem("AvailableBrands") ? JSON.parse(localStorage.getItem("AvailableBrands")): null
}
export const utilsSlice = createSlice({
        name: 'UtilsSlice',
        initialState,
        reducers: {
        //       setUploadProgress: (state, action) => {
        //              return {
        //                    ...state,
        //                   videoUploadProgress: action.payload
        //              }
        //       },
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

              //set  Assets
              setUserAssets: (state, action) => {
                     state.assets = action.payload
                     localStorage.setItem('Assets', JSON.stringify(action.payload))
              },

              //set brands
              setPulledBrands: (state, action) => {
                      state.brands = action.payload               
              },
              setPulledCreators: (state, action) => {
                      state.creators = action.payload
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
                       state.assets = null;
                       state.brands = null;
                       state.creators = null;
                       state.requests = null;
                       state.userBrands = null;
                       state.availableBrands = null;
                       localStorage.clear();
             },

        }
})

export const { 
      setUploadProgress, 
      clearUploadProgress,
      openModal, closeModal, 
      setUserAssets,
       setPulledBrands,
       setRequestedBrands,
       setUserApprovedBrands,
       clearUtils,
       setAvailableBrands,
       setPulledCreators
} = utilsSlice.actions
export default utilsSlice.reducer;