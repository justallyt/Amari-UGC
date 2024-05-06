import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     isBrandAssetModalOpen: false,
     brandNotifications: localStorage.getItem('BrandNotifications') ? JSON.parse(localStorage.getItem('BrandNotifications')) : null,
     brandCreators: localStorage.getItem('BrandCreators') ? JSON.parse(localStorage.getItem('BrandCreators')) : null,
     brandAssets: localStorage.getItem('BrandAssets') ? JSON.parse(localStorage.getItem('BrandAssets')) : null,
     singleCreator: null
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
             },
             openBrandModal: (state) => {
                    state.isBrandAssetModalOpen = true
             }, 
             closeBrandModal: (state) => {
                    state.isBrandAssetModalOpen = false
             },
            setSingleCreator: (state, action) => {
                  state.singleCreator = action.payload
            },
            clearCreator: (state) => {
                   state.singleCreator = null
            },
             clearBrandInfo: (state) => {
                   state.brandNotifications = null;
                   state.brandCreators = null;
                   state.brandAssets = null;
                   state.singleCreator = null;
                   localStorage.clear();
             }
            
      }
})

export const { 
     setBrandNotifications,
     setBrandCreators,
     setBrandAssets,
     openBrandModal,
     closeBrandModal,
     clearBrandInfo,
     setSingleCreator,
     clearCreator
} = brandUtils.actions


export default brandUtils.reducer