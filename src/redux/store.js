import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSliceReducer from './auth/authSlice';
import waterSliceReducer from './water/waterSlice';

const authPersistConfig = {
  key: 'auth-token',
  storage,
  whitelist: ['token'],
};

const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authSliceReducer
);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  water: waterSliceReducer,
});

const middleware = getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  // devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
