import { Component, Input } from '@angular/core';
import { IMovieByScreenView, IMoviesVIew } from 'src/app/utils/models/movies';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() movie: IMoviesVIew | null | undefined;
  

  
}
