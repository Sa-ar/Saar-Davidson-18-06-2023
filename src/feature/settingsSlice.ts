import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/store';
import { shallowEqual } from 'react-redux';

const lightTheme: Theme = {
  background: '#f5f5f5',
  color: '#000000',
  cardBackground: 'rgba(160, 78, 157, 0.2)',
  cardColor: '#000000',
  buttonBackground: '#ffffff',
  buttonColor: 'rgb(160, 78, 157)',
  buttonHoverBackground: 'rgb(160, 78, 157)',
  buttonHoverColor: '#ffffff',
  buttonBorder: 'rgb(160, 78, 157)',
  buttonHoverBorder: '#ffffff',
}

const darkTheme: Theme = {
  background: 'rgb(160, 78, 157)',
  color: '#ffffff',
  cardBackground: 'rgba(255, 255, 255, 0.2)',
  cardColor: '#ffffff',
  buttonBackground: 'rgba(255, 255, 255, 0.2)',
  buttonColor: '#ffffff',
  buttonHoverBackground: '#ffffff',
  buttonHoverColor: 'rgb(160, 78, 157)',
  buttonBorder: '#ffffff',
  buttonHoverBorder: 'rgb(160, 78, 157)',
}

export type Theme = {
  background: string,
  color: string,
  cardBackground: string,
  cardColor: string,
  buttonBackground: string,
  buttonColor: string,
  buttonHoverBackground: string,
  buttonHoverColor: string,
  buttonBorder: string,
  buttonHoverBorder: string,
}

export type SettingsState = {
  isCelsius: boolean,
  theme: {
    background: string,
    color: string,
    cardBackground: string,
    cardColor: string,
    buttonBackground: string,
    buttonColor: string,
    buttonHoverBackground: string,
    buttonHoverColor: string,
    buttonBorder: string,
    buttonHoverBorder: string,
  },
}

const initialState: SettingsState = {
  isCelsius: true,
  theme: lightTheme,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    switchUnits: (state) => {
      state.isCelsius = !state.isCelsius
    },
    switchTheme: (state) => {
      state.theme = shallowEqual(state.theme, lightTheme) ? darkTheme : lightTheme
    }
  },
});

export const { switchTheme, switchUnits } = settingsSlice.actions

export const selectIsCelsius = (state: RootState) => state.settings.isCelsius
export const selectTheme = (state: RootState) => state.settings.theme

export const isDarkTheme = (theme: Theme) => shallowEqual(theme, darkTheme)

export default settingsSlice.reducer
