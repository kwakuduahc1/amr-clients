import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BsHandler {

  private snack = inject(AlertController)

  onError(err: HttpErrorResponse) {
    let alert;
    let message = '';
    if (err instanceof HttpErrorResponse) {
      switch (err.status) {
        case 400:
          message = err.error.message || 'Something went wrong. Try again some few times or contact support';
          break;
        case 401:
          message = 'You need to sign in';
          break;
        case 403:
          message = 'You cannot access this';
          break;
        case 404:
          message = err.error.message || 'Your request was not found on the server';
          break;
        case 500:
          message = err.error.message || 'DB or server error. Contact the developer';
          break;
        default:
          message = err.error.message || 'Contact support';
          break;
      }
    }
    if (message) {
      alert = from(this.snack.create({
        header: 'Authentication/Authorisation',
        message: message,
        buttons: ['Ok'],
      }));
    }
    else if (err.error.message || err.message) {
      message = err.error.message || err.message;
    }
    else if (err.status >= 500) {
      message = 'Unprogrammed error. Contact support';
    }
    else if (!err.error) {
      message = "This section is under development";
    }
    else if (err.statusText === "Unknown Error") {
      message = "No connection to the server was made. Contact support";
    }
    else {
      message = err.statusText;
    }
    alert = from(this.snack.create({
      header: 'Servr/Database error',
      message: message,
      buttons: ['Ok'],
    }));
    return message;
  }
}
