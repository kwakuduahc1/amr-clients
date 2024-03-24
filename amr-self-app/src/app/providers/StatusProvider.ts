import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginHttpService } from '../http/login-http-service';
import { TokenProvider } from './TokenProvider';
import { from, switchMap, tap } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';
import { IUsers } from 'src/model/IUsers';
import { AlertController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class StatusProvider {
  roles: string[] = [];
  user: IUsers | undefined;
  snack = inject(AlertController);
  jwt = inject(JwtHelperService);
  http = inject(LoginHttpService);
  tp = inject(TokenProvider);
  private store = inject(StorageMap);
  token: string | undefined = ''
  router = inject(Router);
  projects!: string[];

  constructor() {
    this.tp.bearer
      .subscribe(x => {
        if (!this.jwt.isTokenExpired(x)) {
          this.setCreds(this.jwt.decodeToken(x))
        }
        else {
          from(this.snack.create({
            header: 'Login status',
            message: 'Sign in required',
            buttons: ['Ok'],
          }))
            .subscribe()
        }
      })

  }

  isLoggedIn(): boolean {
    return !!this.user
  }

  logout(initiated: boolean = false) {
    this.token = undefined;
    this.store.clear().subscribe();
    this.user = undefined;
    if (initiated)
      this.snack.create({
        header: 'Signout',
        message: 'You have successfully signed out',
        buttons: ['Dismiss']
      });
    else
      this.snack.create({
        header: 'Signin',
        message: 'Your previous session has expired',
        buttons: ['Dismiss']
      });
    this.router.navigate(['/auth/login']);
  }

  isAdmin(): boolean {
    if (Array.isArray(this.roles))
      return this.roles.some(x => x === 'Principal' || x === 'Developer');
    else { return false; }
  }

  canRequest(): boolean {
    if (Array.isArray(this.roles))
      return this.roles.some(x => x === 'Requester');
    else { return false; }
  }

  canAccount(): boolean {
    if (Array.isArray(this.roles))
      return this.roles.some(x => x === 'Finance');
    else { return false; }
  }

  canReview(): boolean {
    if (Array.isArray(this.roles))
      return this.roles.some(x => x === 'Store Officer');
    else { return false; }
  }

  canApprove(): boolean {
    if (Array.isArray(this.roles))
      return this.roles.some(x => x === 'Project Lead');
    else { return false; }
  }

  canAuthorize(): boolean {
    if (Array.isArray(this.roles))
      return this.roles.some(x => x === 'Administration' || x === "Director" || x === "Principal");
    else { return false; }
  }

  login(login: IUsers) {
    this.snack.create({
      header: 'Authentication',
      message: "Signing in",
      buttons: ['Dismiss'],
    });
    return this.http.login(login).pipe(
      tap(res => this.setCreds(this.jwt.decodeToken(res.token))),
      switchMap(x => this.tp.setToken(x.token)))
  }

  setCreds(tkn: { [x: string]: any } | null) {
    if (tkn) {
      this.roles = tkn['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.projects = tkn['Project'];
      this.user = {
        password: '',
        title: tkn['title'],
        id: tkn['UsersID'],
        confirmPassword: '',
        email: tkn['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        phoneNumber: tkn['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone'],
        fullName: tkn['FullName'],
        userName: tkn['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        usersID: tkn['UsersID']
      };
    }
  }
}
