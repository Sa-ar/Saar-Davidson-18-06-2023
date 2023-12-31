import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { weatherApi } from '@/feature/weather'
import locationsReducer from '@/feature/locationsSlice';
import settingsReducer from '@/feature/settingsSlice';
import pagesReducer from '@/feature/pagesSlice';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
  [weatherApi.reducerPath]: weatherApi.reducer,
  locations: locationsReducer,
  settings: settingsReducer,
  pages: pagesReducer,
}))

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const persister = persistStore(store)
