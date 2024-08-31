import { PlanningInstrument } from '../generalTypes/planningInstrumentType';
import { ConsultationData, OEIConsultationData, AEIConsultationData } from '../peiRequests/types/consultationType';
import { generateSessionId } from './sessionUtils';

const MAX_CONSULTATIONS = 50;

interface SessionData {
  planningInstrument: PlanningInstrument;
  consultations: ConsultationData[];
}

export const saveSession = (sessionId: string, sessionData: SessionData): void => {
  try {
    localStorage.setItem(sessionId, JSON.stringify(sessionData));
  } catch (error) {
    console.error('Error saving session:', error);
  }
};

export const getSession = (sessionId: string): SessionData | null => {
  try {
    const sessionData = localStorage.getItem(sessionId);
    return sessionData ? JSON.parse(sessionData) : null;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};

export const addConsultation = (
  planningInstrument: PlanningInstrument,
  consultationData: OEIConsultationData | AEIConsultationData
): void => {
  try {
    const sessionId = generateSessionId(planningInstrument);
    const session = getSession(sessionId) || { planningInstrument, consultations: [] };

    if (session.consultations.length >= MAX_CONSULTATIONS) {
      session.consultations.shift();
    }

    session.consultations.push(consultationData);
    saveSession(sessionId, session);
  } catch (error) {
    console.error('Error adding consultation:', error);
  }
};

export const getConsultationHistory = (planningInstrument: PlanningInstrument): ConsultationData[] => {
  try {
    const sessionId = generateSessionId(planningInstrument);
    const session = getSession(sessionId);
    return session ? session.consultations : [];
  } catch (error) {
    console.error('Error getting consultation history:', error);
    return [];
  }
};

export const clearSession = (sessionId: string): void => {
  try {
    localStorage.removeItem(sessionId);
  } catch (error) {
    console.error('Error clearing session:', error);
  }
};