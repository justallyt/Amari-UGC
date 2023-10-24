import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     brandNotifications: localStorage.getItem('BrandNotifications') ? JSON.parse(localStorage.getItem('BrandNotifications')) : null,
     brandCreators: localStorage.getItem('BrandCreators') ? JSON.parse(localStorage.getItem('BrandCreators')) : null,
     brandAssets: localStorage.getItem('BrandAssets') ? JSON.parse(localStorage.getItem('BrandAssets')) : null
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
             },
             setBrandAssets: (state, action) => {
                    state.brandAssets = action.payload
                    localStorage.setItem('BrandAssets', JSON.stringify(action.payload))
             }
      }
})

export const { 
     setBrandNotifications,
     setBrandCreators,
     setBrandAssets
} = brandUtils.actions


export default brandUtils.reducer