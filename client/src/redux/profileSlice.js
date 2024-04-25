import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       profile: localStorage.getItem("profileInfo") ? JSON.parse(localStorage.getItem("profileInfo")) : null,
       unread_notifications: localStorage.getItem("UnreadNotifications") ? JSON.parse(localStorage.getItem("UnreadNotifications")) : null,
       all_notifications: localStorage.getItem('AllNotifications') ? JSON.parse(localStorage.getItem('AllNotifications')) : null
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
                          state.profile = null,
                          state.unread_notifications = null,
                          state.all_notifications = null,
                          localStorage.removeItem('profileInfo')
                },
                clearProfilePic: (state) => {
                        state.profile.profilePic.url = 'null'
                },
                setUnreadNotifications: (state, action) =>{
                        state.unread_notifications = action.payload
                        localStorage.setItem("UnreadNotifications", JSON.stringify(action.payload))
                },
                setAllNotifications: (state, action) => {
                        state.all_notifications = action.payload
                        localStorage.setItem("AllNotifications", JSON.stringify(action.payload)) 
                }
        }
})

export const { setProfile, clearProfile, clearProfilePic, setUnreadNotifications, setAllNotifications } = profileSlice.actions

export default profileSlice.reducer;