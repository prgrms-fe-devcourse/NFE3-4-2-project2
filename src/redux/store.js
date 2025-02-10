import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './slices/user.slice';
import wishlistReducer from './slices/wishlist.slice'; 
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // 세션 스토리지에 저장

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // 'user'리듀서만 persist하게 설정,
  timeout: 1000,
};

const reducers = combineReducers({
  user: userSlice.reducer,
  wishlist: wishlistReducer, // 테스트 용
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
