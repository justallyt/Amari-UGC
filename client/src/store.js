import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice"
import profileReducer from "./redux/profileSlice"
import { apiSlice } from "./redux/apiSlice";
const store = configureStore({
       reducer: {
           auth: authReducer,
           profile: profileReducer,
           [apiSlice.reducerPath] : apiSlice.reducer
       },
       middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
       devTools: true
})

export default store