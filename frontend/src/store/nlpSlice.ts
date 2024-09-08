import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { OEIData, AEIData, IndicatorsResponse } from '../peiRequests/types/peiType';
import { RootState } from './index';
import { processOEI, processAEI } from '../services/api';

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
    let response;
    if (payload.type === 'OEI') {
      response = await processOEI(payload.data as OEIData);
    } else {
      response = await processAEI(payload.data as AEIData);
    }
    return response;
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