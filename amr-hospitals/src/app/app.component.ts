import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../environments/environment.development';
import { IUsers } from './model/IUsers';
import { StatusProvider } from './providers/StatusProvider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from "@angular/material/list";
import { CommonModule } from '@angular/common';
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    RouterOutlet,
    RouterLink,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = environment.AppName;
  env = environment;
  status = inject(StatusProvider);
  snack = inject(MatSnackBar);
  constructor(private breakpointObserver: BreakpointObserver) {
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout() {
    this.status.logout();
  }

  login(login: IUsers): void {
    this.status.login(login)
      .subscribe(() => {
        this.snack.open('You have signed in successfully');
      });
  }

  toggleMenu() { }
}
