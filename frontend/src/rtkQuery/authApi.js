import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const BASE_URL=`http://localhost:5000/`;
const REMOTE_URL=`https://fast-check-psi.vercel.app/`
export const authApi = createApi({
        reducerPath: 'authApi',
        baseQuery: fetchBaseQuery(
            { baseUrl: BASE_URL }),
        endpoints: (builder) => ({
            getPokemonByName: builder.post({
            query: (name) => `auth/user`,
        }),
    }),
    })

export const { useGetPokemonByNameQuery } = authApi