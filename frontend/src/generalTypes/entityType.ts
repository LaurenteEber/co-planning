export interface Entity {
  planType: 'PN' | 'PESEM' | 'PDRC' | 'PDLC-P' | 'PDLC-D' | 'PEI'
  planHorizon: {
    startYear: string
    endYear: string
  }
  name: string
  mission: string
}

