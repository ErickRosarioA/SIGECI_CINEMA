import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable, catchError, throwError } from 'rxjs';
import { AccountService } from '../services/account.service';
import { CustomErrorHandlerService } from './custom-error-handler.service';



const UNAUTHORIZED = 401;
const FORBIDDEN = 403;

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(private spinnerService: NgxSpinnerService, private accountService: AccountService, private toastService: ToastrService, private errorHandlerService: CustomErrorHandlerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinnerService.show();

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandlerService.handleError(error);

        return throwError(error);
      }),
      finalize(() => {
        this.spinnerService.hide()
      })
    );
  }


  private handleError(err: HttpErrorResponse) {
    if ([UNAUTHORIZED, FORBIDDEN].includes(err.status)) {
      // auto logout if 401 or 403 response returned from api
      console.log('You are not authorized to do this action')
      this.toastService.error('You are not authorized to do this action');

      if (!this.accountService.isAuthenticated()) {
        this.accountService.logOut();
      }
    }

    const error = (err && err.error && err.error.message) || err.statusText;

    return throwError(() => new Error(error));
  }
}
