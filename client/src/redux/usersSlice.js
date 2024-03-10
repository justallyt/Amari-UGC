import { apiSlice } from "./apiSlice";

export const usersSlice = apiSlice.injectEndpoints({
        endpoints: (builder) => ({
             loginUser: builder.mutation({
                      query: (payload) => ({
                              url: `user/login`,
                              method: 'POST',
                              body: payload,
                      })
              }),
             createUser: builder.mutation({
                    query: (payload) => ({
                          url: `user/register`,
                          method: 'POST',
                          body: payload,
                    })
              }),
              confirmUser: builder.mutation({
                       query: (payload) => ({
                              url: 'user/confirm-account',
                              method: 'POST',
                              body:  payload
                       })
              }),
              resendUserOTP: builder.mutation({
                      query: (payload) => ({
                              url: 'user/resend-otp',
                              method: "POST",
                              body: payload
                      })
              }),
            getUserProfile: builder.query({
                  query: () => ({
                          url: 'user/profile',
                          method: "GET",
                  }),
                  providesTags: ['UserProfile']
            }), 
            updateUserProfile: builder.mutation({
                   query: (payload) => ({
                          url: 'user/update-profile',
                          method: 'PUT',
                          body: payload
                   })
            }),
             logoutUser: builder.mutation({
                    query: (payload) => ({
                           url: 'user/logout',
                           method: "POST",
                           body: payload
                    }),
                    invalidatesTags: ['UserProfile']
              }),
              requestCreationPermission: builder.mutation({
                     query: (payload) => ({
                            url: 'user/creation-request',
                            method: 'POST',
                            body: payload
                     }),
                     invalidatesTags: ['Request']
              }),
              getBrands: builder.query({
                     query: () =>( {
                             url: 'user/getbrandsforcreators',
                             method: 'GET'
                     }),
                     providesTags: ['UserProfile']
              }),
              //Check for already requested brands
              checkRequests: builder.query({
                      query: () => ({
                             url: 'user/check-requests',
                             method: 'GET'
                      }),
                      providesTags: ['Request']
              }),
               
              //get all notifications
              getUserNotifications: builder.query({
                     query: () => ({
                             url:  '/user/all-notifications',
                             method: 'GET'
                     }),
                     providesTags: ['Notifications']
              }),
              
              //get all unread notifications
              getUnreadUserNotifications: builder.query({
                       query: () => ({
                              url: '/user/unread-notifications',
                              method: 'GET'
                       }),
                       providesTags: ['Notifications']
              }),

            //mark all notifications as read
            readAllUserNotifications: builder.mutation({
                   query: () => ({
                         url: '/user/update-all-notifications',
                         method: 'PUT'
                   }),
                   invalidatesTags: ["Notifications"]
            })
        })
})

export const { 
       useLoginUserMutation, 
       useCreateUserMutation,
       useConfirmUserMutation,
       useUpdateUserProfileMutation, 
       useGetUserProfileQuery,
       useLogoutUserMutation,
       useRequestCreationPermissionMutation,
       useGetBrandsQuery,
       useCheckRequestsQuery,
       useGetUserNotificationsQuery,
       useGetUnreadUserNotificationsQuery,
       useReadAllUserNotificationsMutation,
       useResendUserOTPMutation
} = usersSlice;