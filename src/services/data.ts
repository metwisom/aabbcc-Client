import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from "./store.ts";
import {LoginRequest, LoginResponse, RegisterResponse} from "./auth.ts";
import {AspectResponse} from "./aspect.ts";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:45214/',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Content-Type', 'application/json')
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Register'],
  endpoints: (build) => ({
    getData: build.mutation<AspectResponse, void>({
      query: (body) => ({
        url: `data`,
        method: 'GET',
        body,
      })
    }),
    addAuth: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: `auth`,
        method: 'POST',
        body,
      })
    }),
    register: build.mutation<RegisterResponse, LoginRequest>({
      query: (body) => ({
        url: `register`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetDataMutation,
  useAddAuthMutation,
} = api;
