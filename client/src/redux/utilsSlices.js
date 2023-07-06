import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
      videoUploadProgress: 0
}
export const utilsSlice = createSlice({
        name: 'uploadSlice',
        initialState,
        reducers: {
              setUploadProgress: (state, action) => {
                   state.videoUploadProgress = action.payload
              }
        }
})

export const { setUploadProgress } = utilsSlice.actions
export default utilsSlice.reducer;