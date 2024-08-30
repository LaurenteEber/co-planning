import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Entity } from '../generalTypes/planningInstrumentType';
import { OEIData, AEIData, IndicatorsResponse } from '../peiRequests/types/peiType';
import { RootState } from './index';

interface NLPState {
  loading: boolean;
  error: string | null;
  indicatorsResponse: IndicatorsResponse | null;
}

export const fetchIndicators = createAsyncThunk<
  IndicatorsResponse,
  { entity: Entity; data: OEIData | AEIData; type: 'OEI' | 'AEI' },
  { rejectValue: string }
>('nlp/fetchIndicators', async (payload, { rejectWithValue }) => {
  try {
    // Aquí iría la lógica para hacer la llamada a la API del módulo NLP
    const response = await fetch('/api/nlp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (err) {
    return rejectWithValue(`Failed to fetch indicators: ${err}`);
  }
});

const initialState: NLPState = {
  loading: false,
  error: null,
  indicatorsResponse: null,
};

const nlpSlice = createSlice({
  name: 'nlp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndicators.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIndicators.fulfilled, (state, action) => {
        state.loading = false;
        state.indicatorsResponse = action.payload;
      })
      .addCase(fetchIndicators.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error occurred';
      });
  },
});

export const selectNLPState = (state: RootState) => state.nlp;

export default nlpSlice.reducer;