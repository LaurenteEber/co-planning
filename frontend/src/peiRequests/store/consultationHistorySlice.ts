import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConsultationHistoryState, ConsultationData } from '../types/consultationType';



const initialState: ConsultationHistoryState = {
  consultations: [],
  selectedConsultation: null,
};

const consultationHistorySlice = createSlice({
  name: 'consultationHistory',
  initialState,
  reducers: {
    setConsultationHistory: (state, action: PayloadAction<ConsultationData[]>) => {
      state.consultations = action.payload;
    },
    addConsultation: (state, action: PayloadAction<ConsultationData>) => {
      state.consultations.push(action.payload);
    },
    clearConsultationHistory: (state) => {
      state.consultations = [];
    },
    setSelectedConsultation: (state, action: PayloadAction<ConsultationData | null>) => {
      state.selectedConsultation = action.payload;
    },
  },
});

export const { setConsultationHistory, addConsultation, clearConsultationHistory, setSelectedConsultation } = consultationHistorySlice.actions;
export default consultationHistorySlice.reducer;