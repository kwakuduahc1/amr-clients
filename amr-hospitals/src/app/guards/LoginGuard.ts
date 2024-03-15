import { Event, NavigationCancel, NavigationEnd, NavigationStart, Router, RouterPreloader } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StatusProvider } from '../providers/StatusProvider';
import { RouteProvider } from '../providers/RouteProvider';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root' })
export class LoginGuard {

  snack = inject(MatSnackBar)

  canActivate() {
    return true;
    /*const token = localStorage.getItem('jwt');
    if (token) {
      if (!this.jwt.isTokenExpired(token)) {
        const tkn = this.jwt.decodeToken(token);
        this.status.setCreds(tkn);
        return true;
      }
      else {
        this.snack.open('Re-sign in');
        this.status.logout();
      }
    }
    else {
      this.snack.open('Authenticated users only');
    }
    return false;
    */
  }


  constructor(private router: Router, private rp: RouteProvider) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationCancel) {
        this.rp.path = event.url;
      }
    });
  }
}
