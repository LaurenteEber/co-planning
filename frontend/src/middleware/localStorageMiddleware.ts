import { Middleware } from 'redux';
import { RootState } from '../store';
import { saveSession, getSession, addConsultation } from '../utils/localStorage';
import { generateSessionId } from '../utils/sessionUtils';

export const localStorageMiddleware: Middleware<{}, RootState> = store => next => action => {
  const result = next(action);
  const state = store.getState();

  if (action.type === 'planningInstrument/setPlanningInstrument') {
    const sessionId = generateSessionId(action.payload);
    const currentSession = getSession(sessionId);
    if (!currentSession) {
      saveSession(sessionId, {
        planningInstrument: action.payload,
        consultations: []
      });
    }
  } else if (action.type === 'pei/setOEIData' || action.type === 'pei/setAEIData') {
    addConsultation(state.planningInstrument, {
      id: `${action.type}-${Date.now()}`,
      type: action.type === 'pei/setOEIData' ? 'OEI' : 'AEI',
      data: action.payload,
      recommendations: state.nlp.indicatorsResponse || { indicators: [], message: '' },
      timestamp: Date.now()
    });
  }

  return result;
};