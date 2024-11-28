import { DatePipe } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxDropdownConfig } from 'ngx-select-dropdown';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { CinemaService } from 'src/app/services/cinema.service';
import { MovieService } from 'src/app/services/movie.service';
import { ICinemaScreenView, ICinemaView } from 'src/app/utils/models/cinema';
import { EnumOperation } from 'src/app/utils/models/enums';
import { IMovieByScreenPost, IMovieByScreenView, IMoviesVIew } from 'src/app/utils/models/movies';
import { IErrorResponse } from 'src/app/utils/models/response';

@Component({
  selector: 'app-form-assignment-dialog',
  templateUrl: './form-assignment-dialog.component.html',
  styleUrls: ['./form-assignment-dialog.component.css']
})
export class FormAssignmentDialogComponent {
  title: string = this.data.viewType == EnumOperation.Insert ? "Agregar" :  this.data.viewType == EnumOperation.Update ? "Editar" : "Ver";

  movie: any = {
    coverImage: ''
  }

  enumOperations = EnumOperation;
  
  form = new FormGroup({
    movieByScreenId: new FormControl<number>(0, Validators.required),
    movieId:  new FormControl<number | null>(null,Validators.required),
    screenId:  new FormControl<number| null>(null,Validators.required),
    priceBySeat: new FormControl<number | null>(null),
    showingDate:  new FormControl<string | null>(null),
    showingHour:  new FormControl<string | null>(null),
    isHoliday:  new FormControl<boolean | null>(null),
    holidayName:  new FormControl<string | null>(null),
    userId:  new FormControl<number | null | undefined>(null),
    actorsInMovies: new FormArray<any>([]),

    movieObject: new FormControl<IMoviesVIew | null>(null),
    screenObject: new FormControl<ICinemaScreenView | null>(null),
    cinemaObject: new FormControl<ICinemaView | null>(null),
    cinemaId:  new FormControl<number| null>(null)
  });

  cinemaDropConfig!: NgxDropdownConfig;
  cinemas: ICinemaView[] = []

  movieDropConfig!: NgxDropdownConfig;
  movies: IMoviesVIew[] = []

  cinemaScreenDropConfig!: NgxDropdownConfig;
  screens: ICinemaScreenView[] = []

  constructor(public dialogRef: MatDialogRef<FormAssignmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { movieData: IMovieByScreenView, viewType: EnumOperation },
    private datePipe: DatePipe,
    private movieService: MovieService,
    private cinemaService: CinemaService,
    private alertService: AlertService,
    private accountService: AccountService
  ) {

    switch(data.viewType){
      case EnumOperation.Insert:
        break;
      case EnumOperation.Update:
        this.matchData(data.movieData);
        this.form.get('movieObject')?.disable()
        break;
      case EnumOperation.View:
        this.matchData(data.movieData);
        this.form.disable();
        break;
    }

  }

  ngOnInit(): void {
    this.movieDropConfig = this.getDropDownConfiguration('movieName');
    this.cinemaDropConfig = this.getDropDownConfiguration('cinemaName');
    this.cinemaScreenDropConfig = this.getDropDownConfiguration('screenName');
    this.getCinemas();
    this.getMovies();
  }

  matchData(data:IMovieByScreenView){
    this.form.patchValue({
      ...data,
      showingDate: this.datePipe.transform(data?.showingDate,'yyyy-MM-dd')
    });
  }

  getMovies(){
    this.movieService.getMovieList().subscribe({
      next: (res) => {
        if (!res.succeded) {
          res.warnings.forEach(err => {
            this.alertService.showWarningAlert('', err);
          })

          return;
        }

        this.movies = [...res.dataList];

        const movieId = this.form.get('movieId')?.value;
        if (movieId) {
          const movie = this.movies.find(x => x.movieId == movieId);
          this.form.get('movieObject')?.setValue(movie ?? null);

        }
        
      }
    })
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
          this.getCinemasScreen(cinema?.cinemaId);
        }
      }
    })
  }

  getCinemasScreen(cinemaId: number | null | undefined){

    if(!cinemaId){
      return;
    }

    this.cinemaService.getCinemaScreenByCinemaId(cinemaId).subscribe({
      next: (res) => {
        if (!res.succeded) {
          res.warnings.forEach(err => {
            this.alertService.showWarningAlert('', err);
          })

          return;
        }

        this.screens = [...res.dataList];

        const screenId = this.form.get('screenId')?.value;
        if (screenId) {
          const screen = this.screens.find(x => x.screenId == screenId);
          this.form.get('screenObject')?.setValue(screen ?? null);
        }
      }
    })
  }

  changeCinema() {
    const cinema: ICinemaView | undefined | null = this.form.get('cinemaObject')?.value
    this.form.get('cinemaId')?.setValue(cinema?.cinemaId ?? null)

    
    this.form.get('screenId')?.setValue(null)
    this.form.get('screenObject')?.setValue(null)
    this.screens = []

    this.getCinemasScreen(cinema?.cinemaId);
  }

  changeMovie() {
    const movie: IMoviesVIew | undefined | null = this.form.get('movieObject')?.value
    this.form.get('movieId')?.setValue(movie?.movieId ?? null)
  }

  changeCinemaScreen() {
    const screen: ICinemaScreenView | undefined | null = this.form.get('screenObject')?.value
    this.form.get('screenId')?.setValue(screen?.screenId ?? null)
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

    let model: IMovieByScreenPost = this.form.getRawValue();
    model.showingHour = this.convertToHHMMSS(model?.showingHour);
    model.userId = this.accountService.getUserId();

    if(this.data.viewType == EnumOperation.Insert){
      this.save(model);
    }else if(this.data.viewType == EnumOperation.Update){
      this.update(model);
    } 

  }

  private save(model: IMovieByScreenPost){
    this.movieService.insertMovieByScreen(model).subscribe({
      next: (res)=>{
        if(!res.succeded){
          res.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }

        this.alertService.showSuccessAlert('','Pelicula asignada satisfactoriamente');
        this.dialogRef.close({succeded:true})
      }
    })
  }

  private update(model: IMovieByScreenPost){
    this.movieService.updateMovieByScreen(model).subscribe({
      next: (res)=>{
        if(!res.succeded){
          res.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }

        this.alertService.showSuccessAlert('','Pelicula asignada satisfactoriamente');
        this.dialogRef.close({succeded:true})
      }
    })
  }

  convertToHHMMSS(time: string | null): string | null {
    const timeParts = time?.split(':');
    if (timeParts?.length === 2) {
        return time + ':00';
    } else if (timeParts?.length === 3) {
        return time;
    } else {
        return null
    }
  }
}
