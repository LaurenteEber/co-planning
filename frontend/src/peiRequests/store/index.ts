import { configureStore } from '@reduxjs/toolkit';
import oeiSliceReducer from './recomendationRequest/oeiSlice';
import aeiSliceReducer from './recomendationRequest/aeiSlice';
import entitySliceReducer from './entitySilce';

/* Middlewares */

export const store = configureStore({
  reducer: {
    oeiRequest: oeiSliceReducer,
    aeiRequest: aeiSliceReducer,
    entityEnter: entitySliceReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
