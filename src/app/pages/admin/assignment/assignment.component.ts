import { Component, OnInit } from '@angular/core';
import {
  MatDialog} from '@angular/material/dialog';
import { IMovieByScreenView, IMoviesVIew } from 'src/app/utils/models/movies';
import { MovieService } from 'src/app/services/movie.service';
import { AlertService } from 'src/app/services/alert.service';
import { IErrorResponse } from 'src/app/utils/models/response';
import { EnumOperation } from 'src/app/utils/models/enums';
import { AccountService } from 'src/app/services/account.service';
import { ConfirmDeleteDialogComponent } from 'src/app/shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { ISearcherOptions } from 'src/app/utils/models/filter';
import { FormAssignmentDialogComponent } from './form-assignment-dialog/form-assignment-dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent {

  movies: IMovieByScreenView[] = [];
  moviesFiltered: IMovieByScreenView[] = [];

  modalEnums = EnumOperation

  searchOptions: ISearcherOptions[]=[
    {
      name: 'Secuencia',
      attribute: 'screenId',
      isDate: false,
      isMoney: false,
      isDropDown: false,
      nestedDropdown: []
    },
    {
      name: 'Pelicula',
      attribute: 'movieName',
      isDate: false,
      isMoney: false,
      isDropDown: false,
      nestedDropdown: []
    },
    {
      name: 'Cine',
      attribute: 'cinemaName',
      isDate: false,
      isMoney: false,
      isDropDown: false,
      nestedDropdown: []
    },
    {
      name: 'Sala',
      attribute: 'screenName',
      isDate: false,
      isMoney: false,
      isDropDown: false,
      nestedDropdown: []
    }
  ]

  constructor(public dialog: MatDialog, private movieService: MovieService, private alertService: AlertService, private accountService: AccountService, private datePipe: DatePipe) {}

  ngOnInit(): void {
      this.getList();
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

  openMovieDialog(movie: IMovieByScreenView | null, viewType: EnumOperation): void {
    const dialogRef = this.dialog.open(FormAssignmentDialogComponent, {
      width: '60%', // Ajusta el ancho según tus necesidades
      disableClose: true, // Evita que el diálogo se cierre al hacer clic fuera de él
      data: {movieData: movie,  viewType}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.succeded == true){
        this.getList();
      }
    });
  }

  deleteScreen(movie: IMovieByScreenView): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '300px',
      data: { title: 'Confirmar', message: '¿Estás seguro de que deseas eliminar esta combinacion?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const userId = this.accountService.getUserId();
        this.doDeleteScreen(movie.movieByScreenId, userId);
      }
    });
  }

  private doDeleteScreen(movieByScreenId: number, userId: number){
    this.movieService.deleteMovieByScreen(movieByScreenId, userId).subscribe({
      next: (response)=>{
        if(!response.succeded){
          response.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }
        this.alertService.showSuccessAlert('','Combinacion eliminada satisfactoriamente');
        this.getList();

      }
    })
  }

  changeListForSearch(value: IMovieByScreenView[]){
    this.moviesFiltered = [...value];
  }
}
