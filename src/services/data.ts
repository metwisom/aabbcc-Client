import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from "./store.ts";
import {LoginRequest, LoginResponse, RegisterResponse} from "./auth.ts";
import {AspectResponse} from "./aspect.ts";

function formatIsoStringToDateAndTime(isoString) {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

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
  tagTypes: ['Register','Data'],
  endpoints: (build) => ({
    getData: build.query<AspectResponse, void>({
      query: (body) => ({
        url: `data?from=` + (localStorage.getItem('max') ? formatIsoStringToDateAndTime(localStorage.getItem('max')) : 1),
        method: 'GET',
        body,
      }),
      providesTags: (result, error, arg) => {
        console.log(result.items.map(({time}) => ({type: 'Data' as const, time})))
        return result
            ? [...result.items.map(({time}) => ({type: 'Data' as const, time})), 'Data']
            : ['Data']
      },
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
  useGetDataQuery,
  useAddAuthMutation,
} = api;
