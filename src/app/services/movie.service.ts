import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IResponseModel } from '../utils/models/response';
import { IMovieByScreenPost, IMovieByScreenView, IMovieClassificationVIew, IMovieGenderView, IMovieImagePost, IMoviePost, IMoviesVIew } from '../utils/models/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly baseUrl = environment.API_URL;

  constructor( private httpClient: HttpClient) { }

  getMovieList(){
    return this.httpClient.get<IResponseModel<IMoviesVIew>>(`${this.baseUrl}/Movies`);
  }

  getMovieByName(movieName: string){
    return this.httpClient.get<IResponseModel<IMoviesVIew>>(`${this.baseUrl}/Movies/ByName`,{
      params: <any>{
        movieName: movieName
      }
    });
  }

  getMovieById(movieId: number){
    return this.httpClient.get<IResponseModel<IMoviesVIew>>(`${this.baseUrl}/Movies/ById`,{
      params: <any>{
        movieId: movieId
      }
    });
  }

  getMoviesAssignedList(){
    return this.httpClient.get<IResponseModel<IMoviesVIew>>(`${this.baseUrl}/Movies/GetAllAssigned`);
  }

  getMoviesByScreensList(){
    return this.httpClient.get<IResponseModel<IMovieByScreenView>>(`${this.baseUrl}/MoviesByScreens`);
  }

  getMoviesInScreenByCinemaId(cinemaId: number){
    return this.httpClient.get<IResponseModel<IMovieByScreenView>>(`${this.baseUrl}/MoviesByScreens/ByCinemaId`,{
      params: <any>{
        cinemaId: cinemaId
      }
    });
  }

  getMoviesInScreenByScreenId(screenId: number){
    return this.httpClient.get<IResponseModel<IMoviesVIew>>(`${this.baseUrl}/MoviesByScreens/ByScreenId`,{
      params: <any>{
        screenId: screenId
      }
    });
  }

  getMovieClassifications(){
    return this.httpClient.get<IResponseModel<IMovieClassificationVIew>>(`${this.baseUrl}/MovieClassification`);
  }

  getMovieGenders(){
    return this.httpClient.get<IResponseModel<IMovieGenderView>>(`${this.baseUrl}/MovieGender`);
  }

  insertMovie(model: IMoviePost){
    return this.httpClient.post<IResponseModel<IMoviePost>>(`${this.baseUrl}/Movies`,model);
  }

  updateMovie(model: IMoviePost){
    return this.httpClient.put<IResponseModel<IMoviePost>>(`${this.baseUrl}/Movies`,model);
  }

  deleteMovie(movieId: number, userId: number){
    return this.httpClient.delete<IResponseModel<null>>(`${this.baseUrl}/Movies`,{
      params: <any>{
        movieId: movieId,
        userId: userId
      }
    });
  }

  deleteActorInMovie(acInMoId: number, userId: number){
    return this.httpClient.delete<IResponseModel<null>>(`${this.baseUrl}/Movies/DeleteActorInMovie`,{
      params: <any>{
        acInMoId: acInMoId,
        userId: userId
      }
    });
  }

  insertMovieByScreen(model: IMovieByScreenPost){
    return this.httpClient.post<IResponseModel<IMovieByScreenPost>>(`${this.baseUrl}/MoviesByScreens`,model);
  }

  updateMovieByScreen(model: IMovieByScreenPost){
    return this.httpClient.put<IResponseModel<IMovieByScreenPost>>(`${this.baseUrl}/MoviesByScreens`,model);
  }

  deleteMovieByScreen(movieByScreenId: number, userId: number){
    return this.httpClient.delete<IResponseModel<null>>(`${this.baseUrl}/MoviesByScreens`,{
      params: <any>{
        movieByScreenId: movieByScreenId,
        userId: userId
      }
    });
  }

  uploadMovieImage(model: IMovieImagePost){

    const formData = new FormData();

    formData.append('MovieId',model.movieId.toString());
    model?.userId ? formData.append('UserId', model?.userId.toString()) : null;
    formData.append('ImageUploaded',model.imageUploaded);

    return this.httpClient.put<IResponseModel<IMoviePost>>(`${this.baseUrl}/Movies/UploadImage`,formData);
  }

  deleteMovieImage(movieId: number, userId: number){
    return this.httpClient.delete<IResponseModel<null>>(`${this.baseUrl}/Movies/DeleteImage`,{
      params: <any>{
        movieId: movieId,
        userId: userId
      }
    });
  }
}
