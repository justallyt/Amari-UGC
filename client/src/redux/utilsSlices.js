import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
      videoUploadProgress: 0
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
              }
        }
})

export const { setUploadProgress, clearUploadProgress } = utilsSlice.actions
export default utilsSlice.reducer;