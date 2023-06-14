import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
      pop: null
}

const authSlice = createSlice({
        name: "auth",
        initialState,
        reducers: {
              setCredentials: (state, action) => {
                      state.userInfo = action.payload;
                      localStorage.setItem("userInfo", JSON.stringify(action.payload))
              },
              clearCredentials: (state, action) => {
                    state.userInfo = null;
                    state.pop = action.payload;
                    localStorage.removeItem('userInfo');
              },
              clearPop: (state)=> {
                     state.pop = null
              }
        }
});

export const { setCredentials, clearCredentials, clearPop } = authSlice.actions;

export default authSlice.reducer;