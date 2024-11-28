import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-card',
  templateUrl: './welcome-card.component.html',
  styleUrls: ['./welcome-card.component.css']
})
export class WelcomeCardComponent {
  imagePath: string = 'assets/logo_blue.png'

  constructor(private router: Router) {}
  isCustomerButtonOutline: boolean = true; // Inicializar como true para que el botón del cliente sea outline

  goCustomerModule(): void {
    this.router.navigate(['/guest']);
  }

  goAdminModule() {
    this.router.navigate(['/admin']);
  }
}
