import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root' })
export class BsHandler {

  constructor(private router: Router, private snack: MatSnackBar) {
  }

  onError(err: HttpErrorResponse) {
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
      this.snack.open(message, 'Dismiss', {
        duration: 5_000,
        panelClass: 'snackbar-info'
      });
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
    this.snack.open(message, 'Dismiss', {
      //duration: 5_000,
      panelClass: 'snackbar-info',
      announcementMessage: 'OO'
    });
    return message;
  }
}
