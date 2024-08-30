import { combineReducers } from '@reduxjs/toolkit';
import oeiSliceReducer from './recommendationRequest/oeiSlice';
import aeiSliceReducer from './recommendationRequest/aeiSlice';

const peiReducer = combineReducers({
  oeiRequest: oeiSliceReducer,
  aeiRequest: aeiSliceReducer,
});

export default peiReducer;
