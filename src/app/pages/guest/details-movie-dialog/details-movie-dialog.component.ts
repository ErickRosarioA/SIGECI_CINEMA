import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxDropdownConfig } from 'ngx-select-dropdown';
import { AlertService } from 'src/app/services/alert.service';
import { CinemaService } from 'src/app/services/cinema.service';
import { MovieService } from 'src/app/services/movie.service';
import { ICinemaView } from 'src/app/utils/models/cinema';
import { IMovieByScreenView, IMoviesVIew } from 'src/app/utils/models/movies';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-details-movie-dialog',
  templateUrl: './details-movie-dialog.component.html',
  styleUrls: ['./details-movie-dialog.component.css']
})
export class DetailsMovieDialogComponent {

  cinemaDropConfig!: NgxDropdownConfig;
  cinemaScreenDropConfig!: NgxDropdownConfig;
  cinemas: ICinemaView[] = [];
  screens: IMovieByScreenView[] = [];

  selectedCinema: ICinemaView | null | undefined;
  noScreens: boolean  | undefined;

  constructor(
    public dialogRef: MatDialogRef<DetailsMovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  IMoviesVIew | null | undefined,
    private cinemaService: CinemaService,
    private movieService: MovieService,
    private alertService: AlertService,
    private datePipe: DatePipe
  ) {

    if(data?.movieId && data?.movieId > 0){
      data.imageUrl = `${environment.API_URL}/Movies/ViewImage/${data.movieId}`
    }

    this.cinemaDropConfig = this.getDropDownConfiguration('cinemaName');
    this.cinemaScreenDropConfig = this.getDropDownConfiguration('screenName');
    this.getCinemas(data?.movieId);
  }


  getCinemas(movieId: number | null | undefined){
   

    this.cinemaService.getCinemaList().subscribe({
      next: (res) => {
        if (!res.succeded) {
          res.warnings.forEach(err => {
            this.alertService.showWarningAlert('', err);
          })
          return;
        }

        this.cinemas = [...res.dataList];
      }
    })
  }

  changeCinema() {
    const cinema: ICinemaView | undefined | null = this.selectedCinema

    this.screens = []
    this.getCinemaScreens(cinema?.cinemaId);
  }

  getCinemaScreens(cinemaId: number | null | undefined){
    if(!cinemaId)
    {
      return;
    }

    this.movieService.getMoviesInScreenByCinemaId(cinemaId).subscribe({
      next: (res) => {
        if (!res.succeded) {
          res.warnings.forEach(err => {
            this.alertService.showWarningAlert('', err);
          })
          return;
        }

        this.screens = [...res.dataList].map(record => ({
          ...record,
          transformedTime: this.transformTime(record.showingHour)
        }));;
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

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
