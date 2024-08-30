import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
  currentView: 'main' | 'peiRequests' | 'pesemRequests'; /* Se agrega a medida que más planes se soporten */
}

const initialState: NavigationState = {
  currentView: 'main',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentView: (state, action: PayloadAction<'main' | 'peiRequests' | 'pesemRequests'>) => {
      state.currentView = action.payload;
    },
  },
});

export const { setCurrentView } = navigationSlice.actions;
export default navigationSlice.reducer;
