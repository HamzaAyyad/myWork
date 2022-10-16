import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastService: ToastrService) { }

  showSuccess(message:string) {
    this.toastService.success(message);
  }

  showWarning(message:string) {
    this.toastService.warning(message);
  }

  showError(message:string) {
    this.toastService.error(message);
  }

  showInfo(message:string) {
    this.toastService.info(message);
  }
}
