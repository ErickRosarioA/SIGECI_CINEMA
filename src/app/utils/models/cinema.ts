export interface ICinemaView {
  cinemaId: number
  cinemaName: string
  countryStateId: number
  stateName: string
  countryId: number
  countryName: string
  primaryAddress: string
  phoneNumber: string
  email: string
  locationLatitude: number
  locationLongitude: number
  isRecordActive: boolean
  createdAt: string
  createdByUserId: number
  lastModificationAt: string
  lastModificationByUserId: number
}

export interface ICinemaPost {
  cinemaId: number | null
  cinemaName: string | null
  countryStateId: number | null
  primaryAddress: string | null
  phoneNumber: string | null
  email: string | null
  locationLatitude: number | null | undefined
  locationLongitude: number | null | undefined
  userId: number | null | undefined
}



export interface ICinemaScreenView {
  screenId: number
  screenName: string
  cinemaId: number
  cinemaName: string
  seats: number
  generalPriceBySeat: number
  isRecordActive: boolean
  createdAt: string
  createdByUserId: number
  lastModificationAt: string
  lastModificationByUserId: number
}


export interface ICinemaScreenPost {
  screenId: number | null
  screenName: string | null
  cinemaId: number | null
  seats: number | null
  generalPriceBySeat: number | null
  userId: number | null | undefined
}
