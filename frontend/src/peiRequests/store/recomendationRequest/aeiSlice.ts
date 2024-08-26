import { createSlice } from "@reduxjs/toolkit"
import { AEIData, IndicatorsResponse } from '../../types/peiType'
import { Entity } from "../../../generalTypes/entityType"

export type AEIRequestType = number

export interface AEIRecomendationRequest {
  entity: Entity
  aeiData: AEIData
  indicatorsResponse: IndicatorsResponse
}

export interface AEIRecomendationRequestWithId extends AEIRecomendationRequest {
  id: AEIRequestType
}

const initialState: AEIRecomendationRequestWithId = {
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