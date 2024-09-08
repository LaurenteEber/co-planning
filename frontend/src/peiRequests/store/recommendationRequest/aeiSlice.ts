import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AEIData, IndicatorsResponse } from '../../types/peiType'
import { PlanningInstrument } from "../../../generalTypes/planningInstrumentType"

export type AEIRequestType = number

export interface AEIRecommendationRequest {
  entity: PlanningInstrument  // TODO: Change to "planningInstrumentInfo"
  aeiData: AEIData
  indicatorsResponse: IndicatorsResponse
}

export interface AEIRecommendationRequestWithId extends AEIRecommendationRequest {
  id: AEIRequestType
}

const initialState: AEIRecommendationRequestWithId = {
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
  aeiData: {
    denomination: '',
    contributingOEI: '',
    products: [
      {
        denomination: '',
        targetPopulation: '',
        qualityCriteria: ''
      }
    ]
  },
  indicatorsResponse: {
    indicators: [],
    message: ''
  }
}

export const aeiSlice = createSlice({
  name: 'aeiRequest',
  initialState,
  reducers: {
    setAEIData: (state, action: PayloadAction<AEIData>) => {
      state.aeiData = action.payload;
    },
    setIndicatorsResponse: (state, action: PayloadAction<IndicatorsResponse>) => {
      state.indicatorsResponse = action.payload;
    },
    resetAEIRequest: () => initialState,
  }
})

export const { setAEIData, setIndicatorsResponse, resetAEIRequest } = aeiSlice.actions;
export default aeiSlice.reducer