import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IResponseModel } from '../utils/models/response';
import { ICinemaPost, ICinemaScreenPost, ICinemaScreenView, ICinemaView } from '../utils/models/cinema';


@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  private readonly baseUrl = environment.API_URL;

  constructor( private httpClient: HttpClient) { }

  getCinemaList(){
    return this.httpClient.get<IResponseModel<ICinemaView>>(`${this.baseUrl}/Cinemas`);
  }

  getCinemaByName(cinemaName: string){
    return this.httpClient.get<IResponseModel<ICinemaView>>(`${this.baseUrl}/Cinemas/ByName`,{
      params: <any>{
        cinemaName: cinemaName
      }
    });
  }

  getCinemaById(cinemaId: number){
    return this.httpClient.get<IResponseModel<ICinemaView>>(`${this.baseUrl}/Cinemas/ById`,{
      params: <any>{
        cinemaId: cinemaId
      }
    });
  }

  getCinemasWithMoviesAssignedByMovieId(movieId: number){
    return this.httpClient.get<IResponseModel<ICinemaView>>(`${this.baseUrl}/Cinemas/WithMoviesAssignedByMovieId`,{
      params: <any>{
        movieId: movieId
      }
    });
  }

  getCinemaScreensList(){
    return this.httpClient.get<IResponseModel<ICinemaScreenView>>(`${this.baseUrl}/CinemaScreens`);
  }

  getCinemaScreenByCinemaId(cinemaId: number){
    return this.httpClient.get<IResponseModel<ICinemaScreenView>>(`${this.baseUrl}/CinemaScreens/ByCinemaId`,{
      params: <any>{
        cinemaId: cinemaId
      }
    });
  }

  insertCinema(model: ICinemaPost){
    return this.httpClient.post<IResponseModel<ICinemaPost>>(`${this.baseUrl}/Cinemas`,model);
  }

  updateCinema(model: ICinemaPost){
    return this.httpClient.put<IResponseModel<ICinemaPost>>(`${this.baseUrl}/Cinemas`,model);
  }

  deleteCinema(cinemaId: number, userId: number){
    return this.httpClient.delete<IResponseModel<null>>(`${this.baseUrl}/Cinemas`,{
      params: <any>{
        cinemaId: cinemaId,
        userId: userId
      }
    });
  }

  insertCinemaScreen(model: ICinemaScreenPost){
    return this.httpClient.post<IResponseModel<ICinemaScreenPost>>(`${this.baseUrl}/CinemaScreens`,model);
  }

  updateCinemaScreen(model: ICinemaScreenPost){
    return this.httpClient.put<IResponseModel<ICinemaScreenPost>>(`${this.baseUrl}/CinemaScreens`,model);
  }

  deleteCinemaScreen(screenId: number, userId: number){
    return this.httpClient.delete<IResponseModel<null>>(`${this.baseUrl}/CinemaScreens`,{
      params: <any>{
        screenId: screenId,
        userId: userId
      }
    });
  }
}
