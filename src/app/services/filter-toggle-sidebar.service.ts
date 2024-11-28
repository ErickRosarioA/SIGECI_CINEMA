import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterToggleSidebarService {
  private menuOpenSubject = new BehaviorSubject<boolean>(false);
  menuOpen$ = this.menuOpenSubject.asObservable();

  toggleMenu(): void {
    this.menuOpenSubject.next(!this.menuOpenSubject.value);
  }
}
