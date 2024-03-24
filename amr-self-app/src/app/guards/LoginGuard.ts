import { Event, NavigationCancel, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { RouteProvider } from '../providers/RouteProvider';

@Injectable({ providedIn: 'root' })
export class LoginGuard {

  constructor(private router: Router, private rp: RouteProvider) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationCancel) {
        this.rp.path = event.url;
      }
    });
  }


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


}
