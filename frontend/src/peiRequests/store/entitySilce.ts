import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entity } from '../../generalTypes/entityType';

const initialState: Entity = {
  planType: 'PEI',
  planHorizon: {
    startYear: '',
    endYear: ''
  },
  name: '',
  mission: ''
};

const entitySlice = createSlice({
  name: 'entity',
  initialState,
  reducers: {
    setEntity: (state, action: PayloadAction<Entity>) => {
      return action.payload;
    }
  }
});

export const { setEntity } = entitySlice.actions;
export default entitySlice.reducer;
