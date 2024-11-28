import { Component, Input } from '@angular/core';
import { ICinemaView } from 'src/app/utils/models/cinema';

@Component({
  selector: 'app-cinema-card',
  templateUrl: './cinema-card.component.html',
  styleUrls: ['./cinema-card.component.css']
})
export class CinemaCardComponent {
  @Input() cinema: ICinemaView | null | undefined;
}
