import { DatePipe } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxDropdownConfig } from 'ngx-select-dropdown';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { MovieService } from 'src/app/services/movie.service';
import { EnumOperation } from 'src/app/utils/models/enums';
import { IMovieClassificationVIew, IMovieGenderView, IMovieImagePost, IMoviePost, IMoviesVIew } from 'src/app/utils/models/movies';
import { IErrorResponse } from 'src/app/utils/models/response';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-movie-dialog',
  templateUrl: './form-movie-dialog.component.html',
  styleUrls: ['./form-movie-dialog.component.css']
})
export class FormMovieDialogComponent implements OnInit {
  title: string = this.data.viewType == EnumOperation.Insert ? "Agregar" : this.data.viewType == EnumOperation.Update ? "Editar" : "Ver";

  movie: any = {
    coverImage: ''
  }

  enumOperations = EnumOperation;

  form = new FormGroup({
    movieId: new FormControl<number>(0, Validators.required),
    movieName: new FormControl<string | null>(null, Validators.required),
    genderId: new FormControl<number | null>(null),
    classificationId: new FormControl<number | null>(null),
    synopsis: new FormControl<string | null>(null),
    directorName: new FormControl<string | null>(null),
    releaseDate: new FormControl<string | null>(null),
    releaseHour: new FormControl<string | null>(null),
    imageUploaded: new FormControl<File | null>(null),
    deleteImageUploaded: new FormControl<boolean | null>(null),
    userId: new FormControl<number | null | undefined>(null),
    actorsInMovies: new FormArray<any>([]),

    classificationObject: new FormControl<IMovieClassificationVIew | null>(null),
    genderObject: new FormControl<IMovieGenderView | null>(null),
  });

  classifiDropConfig!: NgxDropdownConfig;
  gendersDropConfig!: NgxDropdownConfig;

  genders: IMovieGenderView[] = []
  classifications: IMovieClassificationVIew[] = []

  imageUrl: string = "/assets/no-image.png";

  constructor(public dialogRef: MatDialogRef<FormMovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { movieData: IMoviesVIew, viewType: EnumOperation },
    private datePipe: DatePipe,
    private movieService: MovieService,
    private alertService: AlertService,
    private accountService: AccountService
  ) {

    if(data.movieData?.movieId > 0){
      this.imageUrl = `${environment.API_URL}/Movies/ViewImage/${data.movieData.movieId}`
    }

    switch (data.viewType) {
      case EnumOperation.Insert:
        break;
      case EnumOperation.Update:
        this.matchData(data.movieData);
        break;
      case EnumOperation.View:
        this.matchData(data.movieData);
        this.form.disable();
        break;
    }

  }

  ngOnInit(): void {
    this.classifiDropConfig = this.getDropDownConfiguration('classificationName');
    this.gendersDropConfig = this.getDropDownConfiguration('genderName');
    this.getClassifications();
    this.getGenders();
  }

  matchData(data: IMoviesVIew) {
    this.form.patchValue({
      ...data,
      releaseDate: this.datePipe.transform(data.releaseDate, 'yyyy-MM-dd')
    });
  }

  getClassifications() {
    this.movieService.getMovieClassifications().subscribe({
      next: (res) => {
        if (!res.succeded) {
          res.warnings.forEach(err => {
            this.alertService.showWarningAlert('', err);
          })

          return;
        }

        this.classifications = [...res.dataList];

        const classiId = this.form.get('classificationId')?.value;
        if (classiId) {
          const type = this.classifications.find(x => x.classificationId == classiId);
          this.form.get('classificationObject')?.setValue(type ?? null);
        }
      }
    })
  }

  getGenders() {
    this.movieService.getMovieGenders().subscribe({
      next: (res) => {
        if (!res.succeded) {
          res.warnings.forEach(err => {
            this.alertService.showWarningAlert('', err);
          })

          return;
        }

        this.genders = [...res.dataList];

        const genderId = this.form.get('genderId')?.value;
        if (genderId) {
          const type = this.genders.find(x => x.genderId == genderId);
          this.form.get('genderObject')?.setValue(type ?? null);
        }
      }
    })
  }

  changeClassification() {
    const item: IMovieClassificationVIew | undefined | null = this.form.get('classificationObject')?.value
    this.form.get('classificationId')?.setValue(item?.classificationId ?? null)
  }

  changeGender() {
    const item: IMovieGenderView | undefined | null = this.form.get('genderObject')?.value
    this.form.get('genderId')?.setValue(item?.genderId ?? null)
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
    this.form.get('imageUploaded')?.setValue(file ?? null);
    this.imageUrl = file ? URL.createObjectURL(file) : '';
  }


  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {

    if (this.form.invalid) {
      this.alertService.showWarningAlert('Validaciones', 'Debe completar los campos obligatorios')
      return;
    }

    let model: IMoviePost = this.form.getRawValue();
    model.releaseHour = this.convertToHHMMSS(model?.releaseHour);
    model.userId = this.accountService.getUserId();

    if (this.data.viewType == EnumOperation.Insert) {
      this.save(model);
    } else if (this.data.viewType == EnumOperation.Update) {
      this.update(model);
    }

  }

  private save(model: IMoviePost) {
    this.movieService.insertMovie(model).subscribe({
      next: (res) => {
        if (!res.succeded) {
          res.warnings.forEach(warn => {
            this.alertService.showWarningAlert('', warn);
          })
          return;
        }

        if(!model.imageUploaded){
          this.alertService.showSuccessAlert('', 'Pelicula creada satisfactoriamente');
          this.dialogRef.close({ succeded: true })
          return;
        }

        if (res.singleData.movieId && res.singleData.movieId > 0) {
            const imageModel: IMovieImagePost = {
              imageUploaded: model.imageUploaded,
              userId: model.userId,
              movieId: res.singleData.movieId
            }
            this.uploadImage(imageModel, 'Pelicula creada satisfactoriamente');
            return;
        }else{
          this.alertService.showWarningAlert('', 'La imagen no pudo subirse. Favor de comunicarse con un administrador');
        }

        
      }
    })
  }

  private update(model: IMoviePost) {
    this.movieService.updateMovie(model).subscribe({
      next: (res) => {
        if (!res.succeded) {
          res.warnings.forEach(warn => {
            this.alertService.showWarningAlert('', warn);
          })
          return;
        }

        if(!model.imageUploaded){
          this.alertService.showSuccessAlert('', 'Pelicula actualizada satisfactoriamente');
          this.dialogRef.close({ succeded: true })
          return;
        }

        if (model.movieId && model.movieId > 0) {
            const imageModel: IMovieImagePost = {
              imageUploaded: model.imageUploaded,
              userId: model.userId,
              movieId: model.movieId
            }
            this.uploadImage(imageModel, 'Pelicula actualizada satisfactoriamente');
            return;
        }else{
          this.alertService.showWarningAlert('', 'La imagen no pudo subirse. Favor de comunicarse con un administrador');
        }

      }
    })
  }

  private uploadImage(model: IMovieImagePost, successText: string) {
    this.movieService.uploadMovieImage(model).subscribe({
      next: (res) => {
        if (!res.succeded) {
          res.warnings.forEach(warn => {
            this.alertService.showWarningAlert('', warn);
          })
          return;
        }

        this.alertService.showSuccessAlert('', successText);
        this.dialogRef.close({ succeded: true })
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
