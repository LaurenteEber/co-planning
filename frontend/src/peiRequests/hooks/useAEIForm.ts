import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AEIData } from '../types/peiType';
import { setAEIData } from '../store/recommendationRequest/aeiSlice';
import { addConsultation, getConsultationHistory } from '../../utils/localStorage';
import { PlanningInstrument } from '../../generalTypes/planningInstrumentType';

export const useAEIForm = (planningInstrument: PlanningInstrument) => {
  const dispatch = useDispatch();
  const [initialData, setInitialData] = useState<AEIData>({
    denomination: '',
    contributingOEI: '',
    products: [{ denomination: '', targetPopulation: '', qualityCriteria: '' }]
  });

  const loadHistory = useCallback(() => {
    const history = getConsultationHistory(planningInstrument);
    const lastAEIConsultation = history.reverse().find(c => c.type === 'AEI');
    if (lastAEIConsultation) {
      const loadedData = lastAEIConsultation.data as AEIData;
      setInitialData({
        ...loadedData,
        products: loadedData.products.length ? loadedData.products : [{ denomination: '', targetPopulation: '', qualityCriteria: '' }]
      });
    }
  }, [planningInstrument]);

  const handleSubmit = useCallback((data: AEIData) => {
    dispatch(setAEIData(data));
    addConsultation(planningInstrument, {
      id: `AEI-${new Date().toISOString()}`,
      type: 'AEI',
      data,
      recommendations: { indicators: [], message: '' },
      timestamp: Date.now()
    });
  }, [dispatch, planningInstrument]);

  return { initialData, loadHistory, handleSubmit };
};