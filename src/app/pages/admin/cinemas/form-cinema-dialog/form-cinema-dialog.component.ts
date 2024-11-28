import { DatePipe } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxDropdownConfig } from 'ngx-select-dropdown';
import { AccountService } from 'src/app/services/account.service';
import { AddressService } from 'src/app/services/address.service';
import { AlertService } from 'src/app/services/alert.service';
import { CinemaService } from 'src/app/services/cinema.service';
import { ICountryStateView, ICountryView } from 'src/app/utils/models/address';
import { ICinemaPost, ICinemaView } from 'src/app/utils/models/cinema';
import { EnumOperation } from 'src/app/utils/models/enums';
import { IErrorResponse } from 'src/app/utils/models/response';

@Component({
  selector: 'app-form-cinema-dialog',
  templateUrl: './form-cinema-dialog.component.html',
  styleUrls: ['./form-cinema-dialog.component.css']
})
export class FormCinemaDialogComponent implements OnInit {

  title: string = this.data.viewType == EnumOperation.Insert ? "Agregar" :  this.data.viewType == EnumOperation.Update ? "Editar" : "Ver";

  movie: any = {
    coverImage: ''
  }

  enumOperations = EnumOperation;
  
  form = new FormGroup({
    cinemaId: new FormControl<number >(0, Validators.required),
    cinemaName: new FormControl<string | null>(null, Validators.required),
    countryStateId: new FormControl<number | null>(null, Validators.required),
    primaryAddress: new FormControl<string | null>(null),
    phoneNumber: new FormControl<string | null>(null),
    email: new FormControl<string | null>(null),
    locationLatitude: new FormControl<number | null>(null), 
    locationLongitude: new FormControl<number | null>(null), 
    userId: new FormControl<number | null | undefined >(null),

    countryObject: new FormControl<ICountryView | null>(null),
    countryId: new FormControl<number | null>(null),
    countryStateObject: new FormControl<ICountryStateView | null>(null),
  });

  countryDropConfig!: NgxDropdownConfig;
  countryStateDropConfig!: NgxDropdownConfig;

  countries: ICountryView[] = []
  countryStates: ICountryStateView[] = []

  constructor(public dialogRef: MatDialogRef<FormCinemaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cinemaData: ICinemaView, viewType: EnumOperation },
    private datePipe: DatePipe,
    private cinemaService: CinemaService,
    private alertService: AlertService,
    private addressService: AddressService,
    private accountService: AccountService
  ) {

    switch(data.viewType){
      case EnumOperation.Insert:
        break;
      case EnumOperation.Update:
        this.matchData(data.cinemaData);
        break;
      case EnumOperation.View:
        this.matchData(data.cinemaData);
        this.form.disable();
        break;
    }

  }

  ngOnInit(): void {
    this.countryDropConfig = this.getDropDownConfiguration('countryName');
    this.countryStateDropConfig = this.getDropDownConfiguration('stateName');
    this.getCountries();
  }

  matchData(data:ICinemaView){
    this.form.patchValue(data);
  }

  getCountries(){
    this.addressService.getCountriesList().subscribe({
      next: (res) => {
        if (!res.succeded) {
          res.warnings.forEach(err => {
            this.alertService.showWarningAlert('', err);
          })

          return;
        }

        this.countries = [...res.dataList];

        const countryId = this.form.get('countryId')?.value;
        if (countryId) {
          const country = this.countries.find(x => x.countryId == countryId);
          this.form.get('countryObject')?.setValue(country ?? null);

          this.getCountryStates(countryId);
        }

        
      }
    })
  }

  getCountryStates(countryId: number | null | undefined){
    this.addressService.getStatesList().subscribe({
      next: (res) => {
        if (!res.succeded) {
          res.warnings.forEach(err => {
            this.alertService.showWarningAlert('', err);
          })

          return;
        }


        if(countryId){
          this.countryStates = [...res.dataList].filter(x=>x.countryId == countryId);
        }

        const stateId = this.form.get('countryStateId')?.value;
        if (stateId) {
          const countryState = this.countryStates.find(x => x.stateId == stateId);
          this.form.get('countryStateObject')?.setValue(countryState ?? null);
        }

      }
    })
  }

  changeCountry() {
    const country: ICountryView | undefined | null = this.form.get('countryObject')?.value
    this.form.get('countryId')?.setValue(country?.countryId ?? null)

    this.form.get('countryStateObject')?.setValue(null)
    this.form.get('countryStateId')?.setValue(null)
    this.countryStates = [];

    this.getCountryStates(country?.countryId);
  }

  changeCountryState() {
    const state: ICountryStateView | undefined | null = this.form.get('countryStateObject')?.value
    this.form.get('countryStateId')?.setValue(state?.stateId ?? null)
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

    let model: ICinemaPost = this.form.getRawValue();
    model.userId = this.accountService.getUserId();

    if(this.data.viewType == EnumOperation.Insert){
      this.save(model);
    }else if(this.data.viewType == EnumOperation.Update){
      this.update(model);
    } 

  }

  private save(model: ICinemaPost){
    this.cinemaService.insertCinema(model).subscribe({
      next: (res)=>{
        if(!res.succeded){
          res.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }

        this.alertService.showSuccessAlert('','Cine creado satisfactoriamente');
        this.dialogRef.close({succeded:true})
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

  private update(model: ICinemaPost){
    this.cinemaService.updateCinema(model).subscribe({
      next: (res)=>{
        if(!res.succeded){
          res.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }

        this.alertService.showSuccessAlert('','Cine actualizado satisfactoriamente');
        this.dialogRef.close({succeded:true})
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

}
