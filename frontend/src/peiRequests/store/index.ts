import { combineReducers } from '@reduxjs/toolkit';
import oeiReducer from './recommendationRequest/oeiSlice';
import aeiReducer from './recommendationRequest/aeiSlice';

const peiReducer = combineReducers({
  oeiRequest: oeiReducer,
  aeiRequest: aeiReducer,
});

export type PEIState = ReturnType<typeof peiReducer>;
export default peiReducer;
