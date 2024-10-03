import {createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const AppApi = createApi({
    reducerPath : "AppApi",
    baseQuery : fetchBaseQuery({
        baseUrl: "http://localhost:3001/api"
    }),
    endpoints: (builder)=> ({})
})