import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import navigationReducer from './navigationSlice';
import planningInstrumentReducer from './planningInstrumentSlice';
import nlpReducer from './nlpSlice';
import peiReducer from '../peiRequests/store';
import consultationHistoryReducer from '../peiRequests/store/consultationHistorySlice';
import { localStorageMiddleware } from '../middleware/localStorageMiddleware';

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    planningInstrument: planningInstrumentReducer,
    nlp: nlpReducer,
    pei: peiReducer,
    consultationHistory: consultationHistoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
