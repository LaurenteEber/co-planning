import { createSlice } from "@reduxjs/toolkit"
import { AEIData, IndicatorsResponse } from '../../types/peiType'
import { Entity } from "../../../generalTypes/entityType"

export type AEIRequestType = number

export interface AEIRecommendationRequest {
  entity: Entity
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
    name: '',
    mission: ''
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
  reducers: {}
})

export default aeiSlice.reducer