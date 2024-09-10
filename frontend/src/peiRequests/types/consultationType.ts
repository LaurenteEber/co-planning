import { OEIData, AEIData, IndicatorsResponse } from './peiType';

export type ConsultationType = 'OEI' | 'AEI';

export interface BaseConsultationData {
  id: string;
  timestamp: number;
  recommendations: IndicatorsResponse;
}

export interface OEIConsultationData extends BaseConsultationData {
  type: 'OEI';
  data: OEIData;
}

export interface AEIConsultationData extends BaseConsultationData {
  type: 'AEI';
  data: AEIData;
}

export type ConsultationData = OEIConsultationData | AEIConsultationData;

export interface ConsultationHistoryState {
  consultations: ConsultationData[];
  selectedConsultation: ConsultationData | null;
}