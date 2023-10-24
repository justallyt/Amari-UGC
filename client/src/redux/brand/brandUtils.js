import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     brandNotifications: localStorage.getItem('BrandNotifications') ? JSON.parse(localStorage.getItem('BrandNotifications')) : null,
     brandCreators: localStorage.getItem('BrandCreators') ? JSON.parse(localStorage.getItem('BrandCreators')) : null
}

export const brandUtils = createSlice({
      name: 'Brand Utils',
      initialState,
      reducers: {
             setBrandNotifications: (state, action) => {
                   state.brandNotifications = action.payload
                   localStorage.setItem('BrandNotifications', JSON.stringify(action.payload))
             },
             setBrandCreators: (state, action) => {
                    state.brandCreators = action.payload
                    localStorage.setItem("BrandCreators", JSON.stringify(action.payload))
             }
      }
})

export const { 
     setBrandNotifications,
     setBrandCreators
} = brandUtils.actions


export default brandUtils.reducer