import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  imagePath: string = 'assets/logo_white_completed.png'

  currentRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects.split('/')[1];
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  doNagivation(route:string){
    this.router.navigate([route]);
  }
}

