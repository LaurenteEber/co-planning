export interface OEIData {
  denomination: string
  targetPopulation: string
  expectedEffect: string
}

export interface AEIData {
  denomination: string
  contributingOEI: string
  products: Array<{
    denomination: string
    targetPopulation: string
    qualityCriteria: string
  }>
}

export interface IndicatorsResponse {
  indicators?: Array<string>
  message?: string
}