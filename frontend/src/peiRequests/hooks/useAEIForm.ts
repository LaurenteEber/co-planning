import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AEIData } from '../types/peiType';
import { setAEIData } from '../store/recommendationRequest/aeiSlice';
import { addConsultation, getConsultationHistory } from '../../utils/localStorage';
import { PlanningInstrument } from '../../generalTypes/planningInstrumentType';
import { RootState } from '../../store/index';

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
        products: loadedData.products?.length ? loadedData.products : [{ denomination: '', targetPopulation: '', qualityCriteria: '' }]
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
    loadHistory(); // Asegurarse de que el historial se recargue
  }, [dispatch, planningInstrument, loadHistory]);

  const selectedConsultation = useSelector((state: RootState) => state.consultationHistory.selectedConsultation);

  useEffect(() => {
    if (selectedConsultation && selectedConsultation.type === 'AEI') {
      setInitialData({
        ...selectedConsultation.data,
        products: selectedConsultation.data.products?.length ? selectedConsultation.data.products : [{ denomination: '', targetPopulation: '', qualityCriteria: '' }]
      } as AEIData);
    }
  }, [selectedConsultation]);

  return { initialData, loadHistory, handleSubmit };
};