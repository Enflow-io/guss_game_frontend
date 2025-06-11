import { configureStore } from '@reduxjs/toolkit';
import { tapGameApi } from '../features/tap-game/api/tapGameApi';
import { authApi } from '@/features/auth';

export const store = configureStore({
  reducer: {
    [tapGameApi.reducerPath]: tapGameApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tapGameApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
