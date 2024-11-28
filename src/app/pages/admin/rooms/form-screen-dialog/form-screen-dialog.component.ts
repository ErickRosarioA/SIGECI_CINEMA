import { DatePipe } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxDropdownConfig } from 'ngx-select-dropdown';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { CinemaService } from 'src/app/services/cinema.service';
import { ICinemaScreenPost, ICinemaScreenView, ICinemaView } from 'src/app/utils/models/cinema';
import { EnumOperation } from 'src/app/utils/models/enums';
import { IErrorResponse } from 'src/app/utils/models/response';

@Component({
  selector: 'app-form-screen-dialog',
  templateUrl: './form-screen-dialog.component.html',
  styleUrls: ['./form-screen-dialog.component.css']
})
export class FormScreenDialogComponent implements OnInit {

  title: string = this.data.viewType == EnumOperation.Insert ? "Agregar" :  this.data.viewType == EnumOperation.Update ? "Editar" : "Ver";

  movie: any = {
    coverImage: ''
  }

  enumOperations = EnumOperation;

  form = new FormGroup({
    screenId: new FormControl<number >(0, Validators.required),
    screenName: new FormControl<string | null>(null, Validators.required),
    cinemaId: new FormControl<number | null>(null, Validators.required),
    seats: new FormControl<number | null>(0, [Validators.required]),
    generalPriceBySeat: new FormControl<number | null>(null),
    userId: new FormControl<number | null | undefined >(null),

    cinemaObject: new FormControl<ICinemaView | null>(null)
  });

  cinemaDropConfig!: NgxDropdownConfig;

  cinemas: ICinemaView[] = []

  constructor(public dialogRef: MatDialogRef<FormScreenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { screenData: ICinemaScreenView, viewType: EnumOperation },
    private datePipe: DatePipe,
    private cinemaService: CinemaService,
    private alertService: AlertService,
    private accountService: AccountService
  ) {

    switch(data.viewType){
      case EnumOperation.Insert:
        break;
      case EnumOperation.Update:
        this.matchData(data.screenData);
        break;
      case EnumOperation.View:
        this.matchData(data.screenData);
        this.form.disable();
        break;
    }

  }

  ngOnInit(): void {
    this.cinemaDropConfig = this.getDropDownConfiguration('cinemaName');
    this.getCinemas();
  }

  matchData(data:ICinemaScreenView){
    this.form.patchValue(data);
  }

  getCinemas(){
    this.cinemaService.getCinemaList().subscribe({
      next: (res) => {
        if (!res.succeded) {
          res.warnings.forEach(err => {
            this.alertService.showWarningAlert('', err);
          })

          return;
        }

        this.cinemas = [...res.dataList];

        const cinemaId = this.form.get('cinemaId')?.value;
        if (cinemaId) {
          const cinema = this.cinemas.find(x => x.cinemaId == cinemaId);
          this.form.get('cinemaObject')?.setValue(cinema ?? null);

        }

        
      }
    })
  }


  changeCinema() {
    const cinema: ICinemaView | undefined | null = this.form.get('cinemaObject')?.value
    this.form.get('cinemaId')?.setValue(cinema?.cinemaId ?? null)
  }

  private getDropDownConfiguration(displayKey: string = 'name', placeholder: string = 'Seleccionar'): any {
    return {
      displayKey: displayKey, //if objects array passed which key to be displayed defaults to description
      search: true, //true/false for the search functionlity defaults to false,
      height: '300px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder: placeholder, // text to be displayed when no item is selected defaults to Select,
      limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
      moreText: 'Ver más...', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: '¡Sin resultados!', // text to be displayed when no items are found while searching
      searchPlaceholder: 'Buscar', // label thats displayed in search input,
      searchOnKey: displayKey, // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
      clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
      selectAllLabel: 'Seleccionar todo', // label that is displayed in multiple selection for select all
      enableSelectAll: false, // enable select all option to select all available items, default is false
    }
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Realiza acciones necesarias con el archivo (puedes subirlo a un servidor o procesarlo localmente)
      // En este ejemplo, solo se obtiene la URL local del archivo
      this.movie.coverImage = URL.createObjectURL(file);
    }
  }


  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    
    if(this.form.invalid){
      this.alertService.showWarningAlert('Validaciones','Debe completar los campos obligatorios')
      return;
    }

    let model: ICinemaScreenPost = this.form.getRawValue();
    model.userId = this.accountService.getUserId();

    if(this.data.viewType == EnumOperation.Insert){
      this.save(model);
    }else if(this.data.viewType == EnumOperation.Update){
      this.update(model);
    } 

  }

  private save(model: ICinemaScreenPost){
    this.cinemaService.insertCinemaScreen(model).subscribe({
      next: (res)=>{
        if(!res.succeded){
          res.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }

        this.alertService.showSuccessAlert('','Sala creada satisfactoriamente');
        this.dialogRef.close({succeded:true})
      }
    })
  }

  private update(model: ICinemaScreenPost){
    this.cinemaService.updateCinemaScreen(model).subscribe({
      next: (res)=>{
        if(!res.succeded){
          res.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }

        this.alertService.showSuccessAlert('','Sala actualizada satisfactoriamente');
        this.dialogRef.close({succeded:true})
      }
    })
  }
}
