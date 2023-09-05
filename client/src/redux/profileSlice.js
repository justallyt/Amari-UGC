import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       profile: localStorage.getItem("profileInfo") ? JSON.parse(localStorage.getItem("profileInfo")) : null,
       my_notifications: localStorage.getItem("Notifications") ? JSON.parse(localStorage.getItem("Notifications")) : null
}

const profileSlice = createSlice({
        name: 'profile',
        initialState,
        reducers: {
                setProfile: (state, action) => {
                        state.profile = action.payload
                        localStorage.setItem("profileInfo", JSON.stringify(action.payload))
                },
                clearProfile: (state) => {
                          state.profile = null
                          localStorage.removeItem('profileInfo')
                },
                clearProfilePic: (state) => {
                        state.profile.profilePic.url = 'null'
                },
                setNotifications: (state, action) =>{
                        state.my_notifications = action.payload
                        localStorage.setItem("Notifications", JSON.stringify(action.payload))
                }
        }
})

export const { setProfile, clearProfile, clearProfilePic, setNotifications } = profileSlice.actions

export default profileSlice.reducer;