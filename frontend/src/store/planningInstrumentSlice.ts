import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlanningInstrument } from '../generalTypes/planningInstrumentType';

const initialState: PlanningInstrument = {
  planType: '',
  planHorizon: {
    startYear: '',
    endYear: ''
  },
  name: '',
  mission: ''
};

const planningInstrumentSlice = createSlice({
  name: 'planningInstrument',
  initialState,
  reducers: {
    setPlanningInstrument: (state, action: PayloadAction<PlanningInstrument>) => {
      return action.payload;
    }
  }
});

export const { setPlanningInstrument } = planningInstrumentSlice.actions;
export default planningInstrumentSlice.reducer;
