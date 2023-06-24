import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { Middleware } from '@reduxjs/toolkit'
import { toast } from "react-toastify";

import type { Location, DailyWeatherResponse } from '@/types';

const env = import.meta.env ?? process.env;

// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://dataservice.accuweather.com/' }),
  endpoints: (builder) => ({
    get1DayWeatherByCity: builder.query<DailyWeatherResponse, string>({
      query: (locationKey) => `forecasts/v1/daily/1day/${locationKey}?apikey=${env.VITE_API_KEY}`,
    }),
    get5DayWeatherByCity: builder.query<DailyWeatherResponse, string>({
      query: (locationKey) => `forecasts/v1/daily/5day/${locationKey}?apikey=${env.VITE_API_KEY}`,
    }),
    getAutoComplete: builder.query<Location[], string>({
      query: (text) => `locations/v1/cities/autocomplete?apikey=${env.VITE_API_KEY}&q=${text}`,
    }),
  }),
})

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!')
      toast.warn(action.error.data.message)
    }

    return next(action)
  }

export const { useGet1DayWeatherByCityQuery, useGet5DayWeatherByCityQuery, useGetAutoCompleteQuery, useLazyGetAutoCompleteQuery } = weatherApi