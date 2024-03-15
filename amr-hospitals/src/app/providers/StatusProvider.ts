import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginHttpService } from '../http/login-http-service';
import { IUsers } from '../model/IUsers';
import { TokenProvider } from './TokenProvider';
import { MatSnackBar } from "@angular/material/snack-bar";
import { switchMap, tap } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({ providedIn: 'root' })
export class StatusProvider {
  roles: string[] = [];
  user: IUsers | undefined;
  snack = inject(MatSnackBar);
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
          this.snack.open('Previous login are invalid');
          // this.logout(true)
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
      this.snack.open('You have successfully signed out', 'Dismiss');
    else
      this.snack.open("Your previous session has expired", 'Dismiss');
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
    this.snack.open("Signing in", 'Dismiss', { duration: 3_000 });
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
