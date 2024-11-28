import { Component, OnInit } from '@angular/core';
import {
  MatDialog} from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { IErrorResponse } from 'src/app/utils/models/response';
import { EnumOperation } from 'src/app/utils/models/enums';
import { AccountService } from 'src/app/services/account.service';
import { ConfirmDeleteDialogComponent } from 'src/app/shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { ISearcherOptions } from 'src/app/utils/models/filter';
import { CinemaService } from 'src/app/services/cinema.service';
import { ICinemaScreenView } from 'src/app/utils/models/cinema';
import { FormScreenDialogComponent } from './form-screen-dialog/form-screen-dialog.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {

  screens: ICinemaScreenView[] = [];
  screensFiltered: ICinemaScreenView[] = [];

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
      name: 'Nombre',
      attribute: 'screenName',
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
    
  ]

  constructor(public dialog: MatDialog, private cinemaService: CinemaService, private alertService: AlertService, private accountService: AccountService) {}

  ngOnInit(): void {
      this.getList();
  }

  getList(){
    this.cinemaService.getCinemaScreensList().subscribe({
      next: (response)=>{
        if(!response.succeded){
          response.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }

        this.screens = response.dataList;

      }
    })
  }


  openMovieDialog(screen: ICinemaScreenView | null, viewType: EnumOperation): void {
    const dialogRef = this.dialog.open(FormScreenDialogComponent, {
      width: '60%', // Ajusta el ancho según tus necesidades
      disableClose: true, // Evita que el diálogo se cierre al hacer clic fuera de él
      data: {screenData: screen,  viewType}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.succeded == true){
        this.getList();
      }
    });
  }

  deleteScreen(screen: ICinemaScreenView): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '300px',
      data: { title: 'Confirmar', message: '¿Estás seguro de que deseas eliminar esta sala?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const userId = this.accountService.getUserId();
        this.doDeleteScreen(screen.screenId, userId);
      }
    });
  }

  private doDeleteScreen(screenId: number, userId: number){
    this.cinemaService.deleteCinemaScreen(screenId, userId).subscribe({
      next: (response)=>{
        if(!response.succeded){
          response.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }
        this.alertService.showSuccessAlert('','Sala eliminada satisfactoriamente');
        this.getList();

      }
    })
  }

  changeListForSearch(value: ICinemaScreenView[]){
    this.screensFiltered = [...value];
  }
}
