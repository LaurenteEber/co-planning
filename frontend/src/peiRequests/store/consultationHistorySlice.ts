import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConsultationHistoryState, ConsultationData } from '../types/consultationType';

const initialState: ConsultationHistoryState = {
  consultations: [],
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
  },
});

export const { setConsultationHistory, addConsultation, clearConsultationHistory } = consultationHistorySlice.actions;
export default consultationHistorySlice.reducer;