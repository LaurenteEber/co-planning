import { Middleware } from '@reduxjs/toolkit';
import { saveSession, getSession } from '../utils/localStorage';
import { generateSessionId } from '../utils/sessionUtils';
import { setPlanningInstrument } from '../store/planningInstrumentSlice';


export const localStorageMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);

  if (setPlanningInstrument.match(action)) {
    const sessionId = generateSessionId(action.payload);
    const currentSession = getSession(sessionId);
    if (!currentSession) {
      saveSession(sessionId, {
        planningInstrument: action.payload,
        consultations: []
      });
    }
  }
  return result;
};