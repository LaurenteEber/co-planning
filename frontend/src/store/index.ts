import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './navigationSlice';
import planningInstrumentReducer from './planningInstrumentSlice';
import nlpReducer from './nlpSlice';
import oeiReducer from '../peiRequests/store/recommendationRequest/oeiSlice';
import aeiReducer from '../peiRequests/store/recommendationRequest/aeiSlice';
import consultationHistoryReducer from '../peiRequests/store/consultationHistorySlice';
import { localStorageMiddleware } from '../middleware/localStorageMiddleware';

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    planningInstrument: planningInstrumentReducer,
    nlp: nlpReducer,
    pei: {
      oeiRequest: oeiReducer,
      aeiRequest: aeiReducer,
    },
    consultationHistory: consultationHistoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
