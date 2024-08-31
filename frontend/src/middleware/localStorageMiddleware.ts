import { Middleware } from 'redux';
import { RootState } from '../store';
import { saveSession, getSession } from '../utils/localStorage';

export const localStorageMiddleware: Middleware<{}, RootState> = store => next => action => {
  const result = next(action);
  const state = store.getState();

  if (action.type.startsWith('pei/') || action.type.startsWith('planningInstrument/')) {
    const currentSession = getSession();
    if (currentSession) {
      saveSession({
        ...currentSession,
        entity: state.planningInstrument,
        consultations: [
          ...currentSession.consultations,
          {
            id: `${action.type}-${Date.now()}`,
            type: action.type.includes('oei') ? 'OEI' : 'AEI',
            data: action.payload,
            recommendations: state.nlp.indicatorsResponse || { indicators: [], message: '' },
            timestamp: Date.now()
          }
        ]
      });
    }
  }

  return result;
};