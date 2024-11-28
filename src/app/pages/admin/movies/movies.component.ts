import { Component, OnInit } from '@angular/core';
import {
  MatDialog} from '@angular/material/dialog';
import { FormMovieDialogComponent } from './form-movie-dialog/form-movie-dialog.component';
import { IMoviesVIew } from 'src/app/utils/models/movies';
import { MovieService } from 'src/app/services/movie.service';
import { AlertService } from 'src/app/services/alert.service';
import { IErrorResponse } from 'src/app/utils/models/response';
import { EnumOperation } from 'src/app/utils/models/enums';
import { AccountService } from 'src/app/services/account.service';
import { ConfirmDeleteDialogComponent } from 'src/app/shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { ISearcherOptions } from 'src/app/utils/models/filter';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit {

  movies: IMoviesVIew[] = [];
  moviesFiltered: IMoviesVIew[] = [];

  modalEnums = EnumOperation

  searchOptions: ISearcherOptions[]=[
    {
      name: 'Secuencia',
      attribute: 'movieId',
      isDate: false,
      isMoney: false,
      isDropDown: false,
      nestedDropdown: []
    },
    {
      name: 'Nombre',
      attribute: 'movieName',
      isDate: false,
      isMoney: false,
      isDropDown: false,
      nestedDropdown: []
    },
    {
      name: 'Director',
      attribute: 'directorName',
      isDate: false,
      isMoney: false,
      isDropDown: false,
      nestedDropdown: []
    },
    
  ]

  constructor(public dialog: MatDialog, private movieService: MovieService, private alertService: AlertService, private accountService: AccountService) {}

  ngOnInit(): void {
      this.getMovieList();
  }

  getMovieList(){
    this.movieService.getMovieList().subscribe({
      next: (response)=>{
        if(!response.succeded){
          response.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }

        this.movies = response.dataList;

      }
    })
  }


  openMovieDialog(movie: IMoviesVIew | null, viewType: EnumOperation): void {
    const dialogRef = this.dialog.open(FormMovieDialogComponent, {
      width: '60%', // Ajusta el ancho según tus necesidades
      disableClose: true, // Evita que el diálogo se cierre al hacer clic fuera de él
      data: {movieData: movie,  viewType}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.succeded == true){
        this.getMovieList();
      }
    });
  }

  deleteMovie(movie: IMoviesVIew): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '300px',
      data: { title: 'Confirmar', message: '¿Estás seguro de que deseas eliminar esta película?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const userId = this.accountService.getUserId();
        this.doDeleteMovie(movie.movieId, userId);
      }
    });
  }

  private doDeleteMovie(movieId: number, userId: number){
    this.movieService.deleteMovie(movieId, userId).subscribe({
      next: (response)=>{
        if(!response.succeded){
          response.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }

        this.alertService.showSuccessAlert('','Pelicula eliminada satisfactoriamente');
        this.getMovieList();

      }
    })
  }

  changeListForSearch(value: IMoviesVIew[]){
    this.moviesFiltered = [...value];
  }

}
