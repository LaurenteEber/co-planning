import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getConsultationHistory } from '../../utils/localStorage';
import { PlanningInstrument } from '../../generalTypes/planningInstrumentType';
import { ConsultationData } from '../types/consultationType';
import { setOEIData } from '../store/recommendationRequest/oeiSlice';
import { setAEIData } from '../store/recommendationRequest/aeiSlice';

export const useConsultationHistory = (planningInstrument: PlanningInstrument) => {
  const [history, setHistory] = useState<ConsultationData[]>([]);
  const dispatch = useDispatch();

  const loadHistory = useCallback(() => {
    try {
      const consultationHistory = getConsultationHistory(planningInstrument);
      setHistory(consultationHistory);
    } catch (error) {
      console.error('Error loading consultation history:', error);
    }
  }, [planningInstrument]);

  const selectConsultation = useCallback((consultation: ConsultationData) => {
    if (consultation.type === 'OEI') {
      dispatch(setOEIData(consultation.data));
    } else {
      dispatch(setAEIData(consultation.data));
    }
    loadHistory(); // Asegurarse de que el historial se recargue
  }, [dispatch, loadHistory]);

  return { history, loadHistory, selectConsultation };
};