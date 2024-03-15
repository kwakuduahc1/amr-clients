import { Component, inject, input } from '@angular/core';
import { filter, map, switchMap, tap } from 'rxjs';
import { ApprovalVm, IUsers, RegisterVm } from '../../../model/IUsers';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TableHeaders } from '../../../../bs-controls/model/elements';
import { UserHttpService } from '../../../http/user-http-service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../../../bs-controls/buttons/confirmation/confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivityProvider } from '../../../providers/ActivityProvider';
import { TableDisplayComponent } from '../../../../bs-controls/display/table-display/table-display.component';
import { ViewUserComponent } from '../view-user/view-user.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    TableDisplayComponent,
  ],
  providers: [],
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  private http = inject(UserHttpService);
  private diag = inject(MatDialog);
  private snack = inject(MatSnackBar);

  act = inject(ActivityProvider).act()

  users = input.required<RegisterVm[]>();

  headers: TableHeaders = { userName: 'User name', fullName: 'Full name', view: 'View' }

  user!: RegisterVm;

  deleteUser(i: IUsers) {
    this.diag.open(ConfirmationComponent, {
      data: `Do you want to delete this account`,
      width: '350px'
    })
      .afterClosed()
      .pipe(
        filter(p => p),
        switchMap(_ => this.http.remove(i.id)),
        switchMap(_ => this.snack.open(`${i.fullName} was deleted`, 'Dismiss').afterDismissed()))
      .subscribe()
  }

  view(i: RegisterVm) {
    // this.diag.open(ViewUserComponent, {
    //   data: { user: i, teams: this.teams() }
    // })
    //   .afterClosed()
    //   .pipe(
    //     filter(x => !!x),
    //     map(x => {
    //       i.teamsID = x['value']['teamsID'];
    //       return i;
    //     }),
    //     tap(x => console.log(x)),
    //     switchMap(i => this.approve(i))
    //   )
    //   .subscribe(x => console.log(x));
  }

  approve(i: RegisterVm) {
    return this.diag.open(ConfirmationComponent, { data: 'Do ou confirm the details of this person?' })
      .afterClosed()
      .pipe(
        filter(x => !!x),
        map(() => (i as unknown as ApprovalVm)),
        switchMap(x => this.http.approve(x)),
        switchMap(() => this.snack.open(`${i.fullName} was approved`).afterDismissed())
      )
  }

  remove(i: RegisterVm) {
    return this.diag.open(ConfirmationComponent, { data: 'Do ou confirm the details of htis person?' })
      .afterClosed()
      .pipe(
        filter(x => !!x),
        map(() => (i as unknown as IUsers).id),
        tap(o => console.log(o)),
        switchMap(x => this.http.remove(x)),
        switchMap(() => this.snack.open(`${i.fullName} was approved`).afterDismissed())
      )
  }
}