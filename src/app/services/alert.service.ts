import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr: ToastrService) { }

  showSuccessAlert(title: string, message: string){
    this.toastr.success(message, title)
  }

  showErrorAlert(title: string, message: string){
    this.toastr.error(message, title)
  }

  showWarningAlert(title: string, message: string){
    this.toastr.warning(message, title)
  }

  showInfoAlert(title: string, message: string){
    this.toastr.info(message, title)
  }
}
