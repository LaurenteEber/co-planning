import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { OEIData } from '../types/peiType';
import { setOEIData } from '../store/recommendationRequest/oeiSlice';
import { addConsultation, getConsultationHistory } from '../../utils/localStorage';
import { PlanningInstrument } from '../../generalTypes/planningInstrumentType';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';

export const useOEIForm = (planningInstrument: PlanningInstrument) => {
  const dispatch = useDispatch();
  const [initialData, setInitialData] = useState<OEIData>({
    denomination: '',
    targetPopulation: '',
    expectedEffect: ''
  });

  const loadHistory = useCallback(() => {
    const history = getConsultationHistory(planningInstrument);
    const lastOEIConsultation = history.reverse().find(c => c.type === 'OEI');
    if (lastOEIConsultation) {
      setInitialData(lastOEIConsultation.data as OEIData);
    }
  }, [planningInstrument]);

  const handleSubmit = useCallback((data: OEIData) => {
    dispatch(setOEIData(data));
    addConsultation(planningInstrument, {
      id: `OEI-${new Date().toISOString()}`,
      type: 'OEI',
      data,
      recommendations: { indicators: [], message: '' },
      timestamp: Date.now()
    });
    loadHistory(); // Asegurarse de que el historial se recargue
  }, [dispatch, planningInstrument, loadHistory]);

  const selectedConsultation = useSelector((state: RootState) => state.consultationHistory.selectedConsultation);

  useEffect(() => {
    if (selectedConsultation && selectedConsultation.type === 'OEI') {
      setInitialData(selectedConsultation.data as OEIData);
    }
  }, [selectedConsultation]);

  return { initialData, loadHistory, handleSubmit };
};