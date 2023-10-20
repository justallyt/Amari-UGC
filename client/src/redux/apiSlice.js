import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: '/api/'});

export const apiSlice = createApi({
         baseQuery,
         tagTypes: ['Request, Notifications, Assets, Brands, Creators, UserProfile'],
         endpoints: () => ({})
})
