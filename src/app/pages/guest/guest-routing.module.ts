import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesWebFiltersComponent } from './movies-web-filters/movies-web-filters.component';
import { CinemaListComponent } from './cinema-list/cinema-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'webpage', pathMatch: 'full'},
  { path: 'webpage', component: MoviesWebFiltersComponent},
  { path: 'cinemas', component: CinemaListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
