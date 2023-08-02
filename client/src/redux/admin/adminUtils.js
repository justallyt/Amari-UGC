import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        adminRequests: localStorage.getItem('Videos') ? JSON.parse(localStorage.getItem('AdminRequests')) : null,
}

export const adminUtils = createSlice({
       name: 'Admin Utils',
       initialState,
       reducers: {
              setAdminRequests: (state, action) => {
                     state.adminRequests = action.payload;
                     localStorage.setItem('AdminRequests', JSON.stringify(action.payload))
              }
       }
})

export const{
      setAdminRequests
} = adminUtils.actions

export default adminUtils.reducer