import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  public redirectUrl: string = '';

  constructor(private accountService: AccountService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (!this.accountService.isAuthenticated()) {
        this.accountService.redirectUrl = state.url;
  
        this.accountService.logOut();
        return false;
      } else {
  
        const expectedRole = route.data['expectedRole'];

        if(expectedRole){
          const tokenData = this.accountService.getTokenData();
  
          if (expectedRole?.includes(tokenData?.role)) {
    
            Swal.fire(
              {
                icon: 'error',
                text: 'Usted no tiene acceso al módulo seleccionado',
                showConfirmButton: true,
                showCloseButton: true,
                allowOutsideClick: false
              }
            )
            this.accountService.logOut();
    
            return false;
          }
        }
        
      }
  
      return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
  
}
