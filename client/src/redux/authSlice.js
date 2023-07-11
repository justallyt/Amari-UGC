import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
      pop: null,
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
              },
              clearMessage: (state) => {
                      state.userInfo.message = null
                      removeFromStorage()
              },
              updateUsername: (state, action) => {
                      //state.userInfo = { ...state.userInfo, username: action.payload}
                      state.userInfo.username = action.payload
                      changeUsername(action.payload)
              }
        }
});

export const { setCredentials, clearCredentials, clearPop, clearMessage, updateUsername } = authSlice.actions;

export default authSlice.reducer;

function getFromStorage(){
      let elements = [];
      if(localStorage.getItem('userInfo')){
              elements = JSON.parse(localStorage.getItem('userInfo'))
      }
      return elements;
}

function removeFromStorage() {
        let elements = getFromStorage();
        let allside = elements;
         allside = Object.entries(allside);
         allside = allside.filter(item => {
                     return item[0] !== 'message'
         });
         
         const obj = Object.fromEntries(allside)
       
        localStorage.setItem('userInfo', JSON.stringify(obj))
}

const changeUsername = (val) => {
        let elements = getFromStorage();
        
       const updateVal = { ...elements, username: val}

       localStorage.setItem('userInfo', JSON.stringify(updateVal))
}
