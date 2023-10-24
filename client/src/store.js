import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice"
import profileReducer from "./redux/profileSlice"
import utilsReducer from "./redux/utilsSlices"
import adminReducer from './redux/admin/adminUtils'
import brandReducer from './redux/brand/brandUtils'
import { apiSlice } from "./redux/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
       reducer: {
           auth: authReducer,
           profile: profileReducer,
           utils: utilsReducer,
           admin: adminReducer,
           brand: brandReducer,
           [apiSlice.reducerPath] : apiSlice.reducer
       },
       middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
       devTools: true
})

setupListeners(store.dispatch)
export default store