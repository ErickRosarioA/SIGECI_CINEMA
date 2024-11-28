export interface ICountryView {
    countryId: number
    countryName: string
    countryCode: string
    isRecordActive: boolean
    createdAt: string
    createdByUserId: number
    lastModificationAt: string
    lastModificationByUserId: number
}

export interface ICountryStateView {
    stateId: number
    stateName: string
    stateCode: string
    countryId: number
    countryName: string
    isRecordActive: boolean
    createdAt: string
    createdByUserId: number
    lastModificationAt: string
    lastModificationByUserId: number
}
