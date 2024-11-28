export interface IMoviesVIew {
    movieId: number
    movieName: string
    genderId: number
    genderName: string
    classificationId: number
    classificationName: string
    synopsis: string
    directorName: string
    releaseDate: string
    releaseHour: string
    movieTag: string
    imageUrl: string
    imageBytes: string
    imageName: string
    imageExtension: string
    isRecordActive: boolean
    createdAt: string
    createdByUserId: number
    lastModificationAt: string
    lastModificationByUserId: number
}

export interface IMoviePost {
    movieId: number | null
    movieName: string | null
    genderId: number | null
    classificationId: number | null
    synopsis: string | null
    directorName: string | null
    releaseDate: string | null
    releaseHour: string | null
    imageUploaded: File | null
    deleteImageUploaded: boolean | null
    userId: number | null | undefined
    actorsInMovies: IActorsInMoviePost[]
}

export interface IActorsInMoviePost {
    acInMoId: number
    actorFirstname: string
    actorLastname: string
    movieId: number
    userId: number
}

export interface IMovieImagePost{
    movieId: number
    userId: number | undefined | null
    imageUploaded: File
}

export interface IMovieClassificationVIew {
    classificationId: number
    classificationName: string
    isRecordActive: boolean
    createdAt: string
    createdByUserId: number
    lastModificationAt: string
    lastModificationByUserId: number
}

export interface IMovieGenderView {
    genderId: number
    genderName: string
    isRecordActive: boolean
    createdAt: string
    createdByUserId: number
    lastModificationAt: string
    lastModificationByUserId: number
}


export interface IMovieByScreenView {
    movieByScreenId: number
    movieId: number
    movieName: string
    genderId: number
    genderName: string
    classificationId: number
    classificationName: string
    synopsis: string
    directorName: string
    movieTag: string
    screenId: number
    screenName: string
    cinemaId: number
    cinemaName: string
    showingDate: string
    showingHour: string
    transformedTime?: string | null | undefined
    priceBySeat: number
    isHoliday: boolean
    holidayName: string
    isRecordActive: boolean
    createdAt: string
    createdByUserId: number
    lastModificationAt: string
    lastModificationByUserId: number
}

export interface IMovieByScreenPost {
    movieByScreenId: number | null
    movieId: number | null
    screenId: number | null
    showingDate: string | null
    showingHour: string | null
    priceBySeat: number | null
    isHoliday: boolean | null
    holidayName: string | null
    userId: number | null | undefined
}
