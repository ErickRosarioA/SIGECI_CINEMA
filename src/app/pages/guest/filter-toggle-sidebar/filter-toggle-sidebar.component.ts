import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-toggle-sidebar',
  templateUrl: './filter-toggle-sidebar.component.html',
  styleUrls: ['./filter-toggle-sidebar.component.css']
})
export class FilterToggleSidebarComponent {
  generos: string[] = ['Acción', 'Comedia', 'Drama', 'Ciencia Ficción']; // Ejemplo, sustituye con tus datos reales
  cines: string[] = ['Cine A', 'Cine B', 'Cine C']; // Ejemplo, sustituye con tus datos reales

  selectedGenero: string = '';
  selectedCine: string = '';

  constructor() {}

  limpiarFiltros() {
    this.selectedGenero = '';
    this.selectedCine = '';
  }

  buscar() {
    // Aquí puedes realizar acciones relacionadas con la búsqueda
    console.log('Filtros aplicados:', this.selectedGenero, this.selectedCine);
  }
}
