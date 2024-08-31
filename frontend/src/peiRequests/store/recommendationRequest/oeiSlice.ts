import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { OEIData, IndicatorsResponse } from '../../types/peiType'
import { PlanningInstrument } from "../../../generalTypes/planningInstrumentType"

export type OEIRequestType = number

export interface OEIRecommendationRequest {
  entity: PlanningInstrument
  oeiData: OEIData
  indicatorsResponse: IndicatorsResponse
}

export interface OEIRecommendationRequestWithId extends OEIRecommendationRequest {
  id: OEIRequestType
}

const initialState: OEIRecommendationRequestWithId = {
  id: 0,
  entity: {
    planType: 'PEI',
    planHorizon: {
      startYear: '',
      endYear: ''
    },
    entityName: '',
    entityMission: ''
  },
  oeiData: {
    denomination: '',
    targetPopulation: '',
    expectedEffect: ''
  },
  indicatorsResponse: {
    indicators: [],
    message: ''
  }
}

export const oeiSlice = createSlice({
  name: 'oeiRequest',
  initialState,
  reducers: {
    setOEIData: (state, action: PayloadAction<OEIData>) => {
      state.oeiData = action.payload;
    },
    setIndicatorsResponse: (state, action: PayloadAction<IndicatorsResponse>) => {
      state.indicatorsResponse = action.payload;
    },
    resetOEIRequest: () => initialState,
  }
})

export const { setOEIData, setIndicatorsResponse, resetOEIRequest } = oeiSlice.actions;
export default oeiSlice.reducer