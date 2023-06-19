import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       profile: localStorage.getItem("profileInfo") ? JSON.parse(localStorage.getItem("profileInfo")) : null,
}

const profileSlice = createSlice({
        name: 'profile',
        initialState,
        reducers: {
                setProfile: (state, action) => {
                        state.profile = action.payload,
                        localStorage.setItem("profileInfo", JSON.stringify(action.payload))
                }
        }
})

export const { setProfile } = profileSlice.actions

export default profileSlice.reducer;