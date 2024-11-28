import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { FilterToggleSidebarService } from 'src/app/services/filter-toggle-sidebar.service';
import { MovieService } from 'src/app/services/movie.service';
import { INestedDropDown, ISearcherOptions } from 'src/app/utils/models/filter';
import { IMovieClassificationVIew, IMovieGenderView, IMoviesVIew } from 'src/app/utils/models/movies';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() movies: IMoviesVIew[] = [];

  moviesFiltered: IMoviesVIew[] = [];
  @Output() moviesFilteredOutput: EventEmitter<IMoviesVIew[]> = new EventEmitter();

  searchOptions: ISearcherOptions[]=[
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
    }
  ]

  movieGenders: IMovieGenderView[] = [];
  movieClassifications: IMovieClassificationVIew[] = [];

  constructor(public filterMenuService: FilterToggleSidebarService, private movieService: MovieService, private alertService: AlertService) {}

  imagePath: string = 'assets/logo_white_completed.png'

  openFilterMenu(): void {
    this.filterMenuService.toggleMenu();
  }

  ngOnInit(): void {
    this.getParameters();
  }

  getParameters(){
    this.movieService.getMovieClassifications().subscribe({
      next: (response)=>{
        if(!response.succeded){
          response.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }

        this.movieClassifications = response.dataList;

        const searchOption: ISearcherOptions =
        {
          name: 'Clasificación',
          attribute: 'classificationName',
          isDate: false,
          isMoney: false,
          isDropDown: true,
          nestedDropdown: this.movieClassifications.map(clas=>{
            return {
              name: clas.classificationName,
              value: clas.classificationName
            } as INestedDropDown
          })
        }

        this.searchOptions.push(searchOption);

      }
    })

    this.movieService.getMovieGenders().subscribe({
      next: (response)=>{
        if(!response.succeded){
          response.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }

        this.movieGenders = response.dataList

        const searchOption: ISearcherOptions =
        {
          name: 'Genero',
          attribute: 'genderName',
          isDate: false,
          isMoney: false,
          isDropDown: true,
          nestedDropdown: this.movieGenders.map(clas=>{
            return {
              name: clas.genderName,
              value: clas.genderName
            } as INestedDropDown
          })
        }

        this.searchOptions.push(searchOption);
      }
    })
  }

  changeListForSearch(value: IMoviesVIew[]){
    this.moviesFiltered = [...value];
    this.moviesFilteredOutput.emit(this.moviesFiltered);
  }
}
