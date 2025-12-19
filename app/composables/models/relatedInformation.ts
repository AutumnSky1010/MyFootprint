export interface RelatedInformationRef {
  companies: CompanyId[]
  realEstates: RealEstateId[]
}

export interface RelatedInformation {
  companies: Company[]
  realEstates: RealEstate[]
}


export type CompanyId = number
export interface Company {
  name: string
  website: string
}

export type RealEstateId = number
export interface RealEstate {
  name: string
  address: string
  value: number
  website?: string
}