import { configureStore } from '@reduxjs/toolkit';
import navigationSliceReducer from './navigationSlice';
import nlpSliceReducer from './nlpSlice';
import planningInstrumentSliceReducer from './planningInstrumentSlice';
import peiReducer from '../peiRequests/store';

export const store = configureStore({
  reducer: {
    pei: peiReducer,
    planningInstrument: planningInstrumentSliceReducer,
    navigation: navigationSliceReducer,
    nlp: nlpSliceReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
