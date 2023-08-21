import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        adminRequests: localStorage.getItem('Videos') ? JSON.parse(localStorage.getItem('AdminRequests')) : null,
        allBrands: localStorage.getItem('Brands') ? JSON.parse(localStorage.getItem('Brands')) : null,
        allCreators: localStorage.getItem('Creators') ? JSON.parse(localStorage.getItem('Creators')) : null,
        approvedRequests: localStorage.getItem('Approved') ? JSON.parse(localStorage.getItem('Approved')) : null
}

export const adminUtils = createSlice({
       name: 'Admin Utils',
       initialState,
       reducers: {
              setAdminRequests: (state, action) => {
                     state.adminRequests = action.payload;
                     localStorage.setItem('AdminRequests', JSON.stringify(action.payload))
              },
              setAllBrandsForAdmin: (state, action) => {
                     state.allBrands = action.payload;
                     localStorage.setItem('Brands', JSON.stringify(action.payload));
              },
              setAllCreatorsForAdmin: (state, action) => {
                    state.allCreators = action.payload;
                    localStorage.setItem('Creators', JSON.stringify(action.payload))
              },
              setApprovedRequests: (state, action) => {
                      state.approvedRequests = action.payload;
                      localStorage.setItem('Approved', JSON.stringify(action.payload))
              },
             clearAllUtils: (state) => {
                     state.allBrands = null
                     state.adminRequests = null,
                     state.allCreators = null
                     state.approvedRequests = null,
                     localStorage.clear();
             }
       }
})

export const{
      setAdminRequests,
      setAllBrandsForAdmin,
      setAllCreatorsForAdmin,
      setApprovedRequests,
      clearAllUtils
} = adminUtils.actions

export default adminUtils.reducer