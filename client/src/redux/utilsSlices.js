import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
      videoUploadProgress: 0,
      isModalOpen: false
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
             }
        }
})

export const { setUploadProgress, clearUploadProgress, openModal, closeModal } = utilsSlice.actions
export default utilsSlice.reducer;