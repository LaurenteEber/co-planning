import { PlanningInstrument } from '../generalTypes/planningInstrumentType';
import { ConsultationData, OEIConsultationData, AEIConsultationData } from '../peiRequests/types/consultationType';

const SESSION_KEY = 'co-planning-session';
const MAX_CONSULTATIONS = 50;

interface SessionData {
  planningInstrument: PlanningInstrument;
  consultations: ConsultationData[];
}

export const saveSession = (sessionData: SessionData): void => {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  } catch (error) {
    console.error('Error saving session:', error);
  }
};

export const getSession = (): SessionData | null => {
  try {
    const sessionData = localStorage.getItem(SESSION_KEY);
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
    const session = getSession() || { planningInstrument, consultations: [] };

    if (session.consultations.length >= MAX_CONSULTATIONS) {
      session.consultations.shift();
    }

    session.consultations.push(consultationData);
    saveSession(session);
  } catch (error) {
    console.error('Error adding consultation:', error);
  }
};

export const clearSession = (): void => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Error clearing session:', error);
  }
};

export const getConsultationHistory = (planningInstrument: PlanningInstrument): ConsultationData[] => {
  try {
    const session = getSession();
    if (session && JSON.stringify(session.planningInstrument) === JSON.stringify(planningInstrument)) {
      return session.consultations;
    }
    return [];
  } catch (error) {
    console.error('Error getting consultation history:', error);
    return [];
  }
};