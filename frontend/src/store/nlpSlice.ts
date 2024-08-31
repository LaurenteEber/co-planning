import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { OEIData, AEIData, IndicatorsResponse } from '../peiRequests/types/peiType';
import { RootState } from './index';

interface NLPState {
  loading: boolean;
  error: string | null;
  indicatorsResponse: IndicatorsResponse | null;
}

export const fetchIndicators = createAsyncThunk<
  IndicatorsResponse,
  { data: OEIData | AEIData; type: 'OEI' | 'AEI' },
  { rejectValue: string }
>('nlp/fetchIndicators', async (payload, { rejectWithValue }) => {
  try {
    const response = await fetch('/api/nlp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data: IndicatorsResponse = await response.json();
    return data;
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