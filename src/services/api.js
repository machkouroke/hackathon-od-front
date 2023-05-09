import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BASE_URL} from "../config";


export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api`,

    }),
    endpoints: (builder) => ({
        initUrgences: builder.mutation({
            query: (incidents) => ({
                url: `/urgences`,
                body: incidents,
                method: 'POST',
            }),
        })

    })
})

export const {
    useInitUrgencesMutation
} = api