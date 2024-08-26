import { createSlice } from "@reduxjs/toolkit"
import { OEIData, IndicatorsResponse } from '../../types/peiType'
import { Entity } from "../../../generalTypes/entityType"

export type OEIRequestType = number

export interface OEIRecomendationRequest {
  entity: Entity
  oeiData: OEIData
  indicatorsResponse: IndicatorsResponse
}

export interface OEIRecomendationRequestWithId extends OEIRecomendationRequest {
  id: OEIRequestType
}

const initialState: OEIRecomendationRequestWithId = {
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
  reducers: {}
})

export default oeiSlice.reducer