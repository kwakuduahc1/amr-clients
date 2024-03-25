import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginHttpService } from '../http/login-http-service';
import { TokenProvider } from './TokenProvider';
import { combineLatest, combineLatestAll, from, switchMap, tap } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';
import { IUsers, LoginVm } from 'src/model/IUsers';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { LoginComponent } from '../auth/login/login.component';

@Injectable({ providedIn: 'root' })
export class StatusProvider {
  roles: string[] = [];
  user: IUsers | undefined;
  private modal = inject(ModalController);
  private snack = inject(ToastController)
  private jwt = inject(JwtHelperService);
  private http = inject(LoginHttpService);
  private tp = inject(TokenProvider);
  private store = inject(StorageMap);
  private token: string | undefined = ''
  private router = inject(Router);

  duration: number = 500;
  constructor() {

    this.tp.bearer
      .subscribe(x => {
        if (!this.jwt.isTokenExpired(x)) {
          this.setCreds(this.jwt.decodeToken(x))
        }
        else {
          combineLatest([from(this.snack.create({
            message: 'Sign in required',
            buttons: ['Dismiss'],
            duration: this.duration
          })), from(this.modal.create({
            component: LoginComponent,
            canDismiss: true,
            animated: true,
            backdropDismiss: false
          }))])
            .subscribe(x => x.forEach(e => e.present()));
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
    if (initiated) {
      combineLatest([from(this.snack.create({
        message: 'You have successfully signed out',
        buttons: ['Dismiss'],
        duration: this.duration
      })), from(this.modal.create({
        component: LoginComponent,
        canDismiss: true,
        animated: true,
        backdropDismiss: true
      }))])
        .pipe(tap(x => console.log(x)))
        .subscribe(x => x.forEach(e => e.present()));
    }
    else
      from(this.modal.create({
        component: LoginComponent,
        canDismiss: true,
        animated: true,
        backdropDismiss: true
      })).subscribe(x => x.present());
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

  login(login: LoginVm) {
    return from(this.snack.create({
      header: 'Authentication',
      message: "Signing in",
      duration: 200,
    }))
      .pipe(
        switchMap(() => this.http.login(login).pipe(
          tap(res => console.log(res)),
          tap(res => this.setCreds(this.jwt.decodeToken(res.token))),
          switchMap(x => this.tp.setToken(x.token)))))
  }

  setCreds(tkn: { [x: string]: any } | null) {
    if (tkn) {
      this.roles = tkn['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
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
