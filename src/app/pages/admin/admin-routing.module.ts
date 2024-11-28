import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MoviesComponent } from './movies/movies.component';
import { CinemasComponent } from './cinemas/cinemas.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AssignmentComponent } from './assignment/assignment.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch:'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'cinemas', component: CinemasComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'assignment', component: AssignmentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
