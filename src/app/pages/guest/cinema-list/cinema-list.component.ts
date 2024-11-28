import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { CinemaService } from 'src/app/services/cinema.service';
import { MovieService } from 'src/app/services/movie.service';
import { ICinemaView } from 'src/app/utils/models/cinema';
import { ISearcherOptions } from 'src/app/utils/models/filter';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cinema-list',
  templateUrl: './cinema-list.component.html',
  styleUrls: ['./cinema-list.component.css']
})
export class CinemaListComponent {

  
  cinemas: ICinemaView[] = [];
  cinemasFiltered: ICinemaView[] = [];

  searched: boolean = false;

  searchOptions: ISearcherOptions[]=[
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
    }
  ]

  imagePath: string = 'assets/logo_white_completed.png'

  constructor(public dialog: MatDialog, private cinemaService: CinemaService, private alertService: AlertService, private datePipe: DatePipe, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void{
    this.getList()
  }

  getList(){
    this.cinemaService.getCinemaList().subscribe({
      next: (response)=>{
        if(!response.succeded){
          response.warnings.forEach(warn=>{
            this.alertService.showWarningAlert('',warn);
          })
          return;
        }

        this.cinemas = response.dataList;

        this.searched = true;
      }
    })
  }

  changeListForSearch(value: ICinemaView[]){
    this.cinemasFiltered = [...value];
    this.cdr.detectChanges();
  }
}
