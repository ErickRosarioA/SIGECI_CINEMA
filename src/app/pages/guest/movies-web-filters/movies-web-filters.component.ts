import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsMovieDialogComponent } from '../details-movie-dialog/details-movie-dialog.component';
import { MovieService } from 'src/app/services/movie.service';
import { IMovieByScreenView, IMoviesVIew } from 'src/app/utils/models/movies';
import { AlertService } from 'src/app/services/alert.service';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies-web-filters',
  templateUrl: './movies-web-filters.component.html',
  styleUrls: ['./movies-web-filters.component.css']
})
export class MoviesWebFiltersComponent implements OnInit {

  movies: IMoviesVIew[] = [];
  moviesFiltered: IMoviesVIew[] = [];

  searched: boolean = false;


  constructor(public dialog: MatDialog, private movieService: MovieService, private alertService: AlertService, private datePipe: DatePipe, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void{
    this.getList()
  }

  getList(){
    this.movieService.getMoviesAssignedList().subscribe({
      next: (response)=>{
        if(!response.succeded){
          response.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }

        this.movies = response.dataList.map(record => ({
          ...record,
          imageUrl: `${environment.API_URL}/Movies/ViewImage/${record.movieId}`
        }));

        this.searched = true;
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

  openMovieDialog(movie: IMoviesVIew): void {
    const dialogRef = this.dialog.open(DetailsMovieDialogComponent, {
      width: '60%',
      data: movie,
    });

    dialogRef.afterClosed().subscribe(result => {
      // Puedes realizar acciones después de que se cierre el diálogo
    });
  }

  changeListForSearch(value: IMoviesVIew[]){
    this.moviesFiltered = [...value];
    this.cdr.detectChanges();
  }
}
