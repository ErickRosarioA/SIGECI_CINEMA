import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { IErrorResponse } from './models/response';

const UNAUTHORIZED = 401;
const FORBIDDEN = 403;


@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService {

  constructor(private alertService: AlertService) { }

  handleError(error: any): void {

    if (error instanceof HttpErrorResponse) {
      
        // Comprueba si el error tiene las propiedades esperadas
        if (error?.error && 'Message' in error.error && 'Details' in error.error) {
          // Error del backend
          const errorResponse: IErrorResponse = error.error;
          if (errorResponse?.Message) {
            this.alertService.showErrorAlert('', errorResponse?.Message);
          }
          errorResponse?.Details?.forEach(detail => {
            this.alertService.showErrorAlert(detail?.Title, detail?.Message);
          })
        } else {
          // Error del cliente o de red
          this.alertService.showErrorAlert('Ha ocurrido un error inesperado', error?.message);
        }
      
    } else {

      // Otro tipo de error (no relacionado con HTTP)
      this.alertService.showErrorAlert('Ha ocurrido un error inesperado', 'Favor de comunicarse con un administrador.');
    }
  }
}
