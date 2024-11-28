import { Component, OnInit } from '@angular/core';
import {
  MatDialog} from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { IErrorResponse } from 'src/app/utils/models/response';
import { EnumOperation } from 'src/app/utils/models/enums';
import { AccountService } from 'src/app/services/account.service';
import { ConfirmDeleteDialogComponent } from 'src/app/shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { ISearcherOptions } from 'src/app/utils/models/filter';
import { ICinemaView } from 'src/app/utils/models/cinema';
import { CinemaService } from 'src/app/services/cinema.service';
import { FormCinemaDialogComponent } from './form-cinema-dialog/form-cinema-dialog.component';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.css']
})
export class CinemasComponent {

  
  cinemas: ICinemaView[] = [];
  cinemasFiltered: ICinemaView[] = [];

  modalEnums = EnumOperation

  searchOptions: ISearcherOptions[]=[
    {
      name: 'Secuencia',
      attribute: 'cinemaId',
      isDate: false,
      isMoney: false,
      isDropDown: false,
      nestedDropdown: []
    },
    {
      name: 'Nombre',
      attribute: 'cinemaName',
      isDate: false,
      isMoney: false,
      isDropDown: false,
      nestedDropdown: []
    },
    {
      name: 'Provincia',
      attribute: 'stateName',
      isDate: false,
      isMoney: false,
      isDropDown: false,
      nestedDropdown: []
    },
    
  ]

  constructor(public dialog: MatDialog, private cinemaService: CinemaService, private alertService: AlertService, private accountService: AccountService) {}

  ngOnInit(): void {
      this.getMovieList();
  }

  getMovieList(){
    this.cinemaService.getCinemaList().subscribe({
      next: (response)=>{
        if(!response.succeded){
          response.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }

        this.cinemas = response.dataList;

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


  openMovieDialog(cinema: ICinemaView | null, viewType: EnumOperation): void {
    const dialogRef = this.dialog.open(FormCinemaDialogComponent, {
      width: '60%', // Ajusta el ancho según tus necesidades
      disableClose: true, // Evita que el diálogo se cierre al hacer clic fuera de él
      data: {cinemaData: cinema,  viewType}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.succeded == true){
        this.getMovieList();
      }
    });
  }

  deleteCinema(cinema: ICinemaView): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '300px',
      data: { title: 'Confirmar', message: '¿Estás seguro de que deseas eliminar este cine?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const userId = this.accountService.getUserId();
        this.doDeleteCinema(cinema.cinemaId, userId);
      }
    });
  }

  private doDeleteCinema(movieId: number, userId: number){
    this.cinemaService.deleteCinema(movieId, userId).subscribe({
      next: (response)=>{
        if(!response.succeded){
          response.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }
        this.alertService.showSuccessAlert('','Cine eliminado satisfactoriamente');
        this.getMovieList();

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

  changeListForSearch(value: ICinemaView[]){
    this.cinemasFiltered = [...value];
  }

}
