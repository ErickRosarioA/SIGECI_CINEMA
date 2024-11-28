import { Component } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { AlertService } from 'src/app/services/alert.service';
import { CinemaService } from 'src/app/services/cinema.service';
import { IErrorResponse } from 'src/app/utils/models/response';
import { IMovieByScreenView } from 'src/app/utils/models/movies';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  moviesCount: number = 0;
  cinemasCount:number = 0;
  roomsCount:number= 0;
  movies: IMovieByScreenView[] = [];


  constructor(private movieService: MovieService, private datePipe: DatePipe, private alertService: AlertService,private cinemaService: CinemaService,) {}

  ngOnInit(): void {
      this.getMoviesCount();
     this.getCinemasCount();
     this.getRoomsCount();
     this.getList();
  }

  getMoviesCount(){
    this.movieService.getMovieList().subscribe({
      next: (response)=>{
        if(!response.succeded){
          response.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }

        this.moviesCount = response.dataList.length;

      }
    })
  }

  getCinemasCount(){
    this.cinemaService.getCinemaList().subscribe({
      next: (response)=>{
        if(!response.succeded){
          response.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }

        this.cinemasCount = response.dataList.length;

      },
      error: (err)=>{
        if (err?.error instanceof IErrorResponse) {
          // Error del backend
          const errorResponse: IErrorResponse = err.error as IErrorResponse;
          if (errorResponse?.Message) {
            this.alertService.showErrorAlert('', errorResponse?.Message);
          }
          errorResponse?.Details?.forEach(err => {
            this.alertService.showErrorAlert(err?.Title, err?.Message);
          })
        } else {
          // Error del cliente o de red
          this.alertService.showErrorAlert('Ha ocurrido un error inesperado', err?.error?.message);
        }
      }
    })
  }

  getRoomsCount(){
    this.cinemaService.getCinemaScreensList().subscribe({
      next: (response)=>{
        if(!response.succeded){
          response.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }

        this.roomsCount = response.dataList.length;

      }
    })
  }


  getList(){
    this.movieService.getMoviesByScreensList().subscribe({
      next: (response)=>{
        if(!response.succeded){
          response.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }

        this.movies = response.dataList.map(record => ({
          ...record,
          transformedTime: this.transformTime(record.showingHour)
        }));

      }
    })
  }

  transformTime(time: string | null | undefined): string | null {
    if(!time){
      return null;
    }
    const tempDate = new Date(`1970-01-01T${time}Z`);  // Agrega una fecha arbitraria
    return this.datePipe.transform(tempDate, 'shortTime');
  }


}
