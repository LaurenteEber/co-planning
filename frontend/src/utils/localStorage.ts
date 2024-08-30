import { Entity } from '../generalTypes/planningInstrumentType';
import { OEIData, AEIData, IndicatorsResponse } from '../peiRequests/types/peiType';

interface ConsultationData {
  id: string;
  type: 'OEI' | 'AEI';
  data: OEIData | AEIData;
  recommendations: IndicatorsResponse;
  timestamp: number;
}

interface SessionData {
  entity: Entity;
  consultations: ConsultationData[];
}

const SESSION_KEY = 'co-planning-session';
const MAX_CONSULTATIONS = 50;

export const saveSession = (sessionData: SessionData): void => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
};

export const getSession = (): SessionData | null => {
  const sessionData = localStorage.getItem(SESSION_KEY);
  return sessionData ? JSON.parse(sessionData) : null;
};

export const addConsultation = (
  entity: Entity,
  consultationData: ConsultationData
): void => {
  const session = getSession() || { entity, consultations: [] };

  if (session.consultations.length >= MAX_CONSULTATIONS) {
    session.consultations.shift();
  }

  session.consultations.push(consultationData);
  saveSession(session);
};

export const clearSession = (): void => {
  localStorage.removeItem(SESSION_KEY);
};

export const getConsultationHistory = (entity: Entity): ConsultationData[] => {
  const session = getSession();
  if (session && JSON.stringify(session.entity) === JSON.stringify(entity)) {
    return session.consultations;
  }
  return [];
};
