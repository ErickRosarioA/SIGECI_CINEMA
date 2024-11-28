import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { MoviesWebFiltersComponent } from './movies-web-filters/movies-web-filters.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterToggleSidebarComponent } from 'src/app/pages/guest/filter-toggle-sidebar/filter-toggle-sidebar.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { DetailsMovieDialogComponent } from './details-movie-dialog/details-movie-dialog.component';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe,provideNgxMask } from 'ngx-mask';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { SharedModule } from 'src/app/shared/shared.module';
import { CinemaCardComponent } from './cinema-card/cinema-card.component';
import { CinemaListComponent } from './cinema-list/cinema-list.component';

@NgModule({
  declarations: [
    MoviesWebFiltersComponent,
    HeaderComponent,
    FooterComponent,
    FilterToggleSidebarComponent,
    MovieCardComponent,
    DetailsMovieDialogComponent,
    CinemaCardComponent,
    CinemaListComponent
  ],
  imports: [
    CommonModule,
    GuestRoutingModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    SelectDropDownModule,
    SharedModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers:[provideNgxMask()]
})
export class GuestModule { }
