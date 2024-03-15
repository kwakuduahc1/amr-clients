import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RegisterVm } from '../../../model/IUsers';
import { DropDownOptions, FormDataVm, FormProperties } from '../../../../bs-controls/model/elements';
import { Teams } from '../../../model/dtos';
import { FormBuilderComponent } from '../../../../bs-controls/forms/form-builder/form-builder.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { UserHttpService } from '../../../http/user-http-service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivityProvider } from '../../../providers/ActivityProvider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [
    CommonModule,
    FormBuilderComponent,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewUserComponent {
  user!: RegisterVm;
  teams!: Teams[]
  act = inject(ActivityProvider).act();

  data = inject(MAT_DIALOG_DATA);
  ref = inject(MatDialogRef<ViewUserComponent>);
  form!: FormDataVm[];
  props: FormProperties = { name: 'form', id: 'form', class: '', legend: 'Team', btnText: 'Aprove', icon: 'user_add' }
  edit = new BehaviorSubject<{ edit: boolean }>({ edit: false });

  ngOnInit() {
    this.form = teamForm;
    this.user = this.data['user'];
    this.teams = (this.data['teams'] as Teams[]).filter(x => x.teamsID > 1);
    let opts: DropDownOptions[] = this.teams.map(x => {
      return { value: x.teamsID, key: x.team }
    })
    teamForm.at(0)!.options = opts;
  }

  diag = inject(MatDialog);
  snack = inject(MatSnackBar);
  http = inject(UserHttpService);

  intPhone(tel: string) {
    return `+233${tel.substring(1)}`
  }

  approve(i?: RegisterVm) {
    this.ref.close(i);
  }

  remove(i?: RegisterVm) {
    this.ref.close(i);
  }
}

const teamForm: FormDataVm[] = [
  {
    name: 'teamsID',
    control_type: 'dropdown',
    label: 'Team',
    required: true,
    title: 'The team',
    hidden: false,
    options: []
  },
]
