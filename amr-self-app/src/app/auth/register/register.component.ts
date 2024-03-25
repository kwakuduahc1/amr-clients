import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormArray, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonIcon, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonButton, ModalController, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personAddOutline, logInSharp } from 'ionicons/icons';
import { from, filter, switchMap, map } from 'rxjs';
import { LoginHttpService } from 'src/app/http/login-http-service';
import { StatusProvider } from 'src/app/providers/StatusProvider';
import { LoginVm, RegisterVm } from 'src/model/IUsers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonList,
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonInput,
    IonItem,
    IonButton,
    FormsModule,
    ReactiveFormsModule,
    IonIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {

  private http = inject(LoginHttpService);
  private toast = inject(ToastController);
  private status = inject(StatusProvider);
  private mod = inject(ModalController);
  private fb = inject(NonNullableFormBuilder);
  pns = this.fb.array<string>([]);
  form = this.fb.group({
    userName: this.fb.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    password: this.fb.control<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    confirmPassword: this.fb.control<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    fullName: this.fb.control<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
    email: this.fb.control<string>('', [Validators.minLength(5), Validators.maxLength(30)]),
    phoneNumber: this.pns,
    role: this.fb.control<string>('Participant', [Validators.minLength(8), Validators.maxLength(30)]),
  })

  get _pns() {
    return this.pns.controls;
  }
  constructor(private router: Router) {
    addIcons({ personAddOutline, logInSharp });
    for (let i = 0; i < 2; i++) {
      this.pns.push(this.fb.control('', [Validators.minLength(10), Validators.maxLength(10)]))
    }
  }
  register(usr: RegisterVm) {
    this.http.register(usr)
      .pipe(
        map(m => {
          return {
            password: usr.password,
            userName: m.userName
          }
        }),
        switchMap((x: LoginVm) => this.status.login(x)),
        switchMap(() => from(this.toast.create({
          header: 'Authentication/Authorization',
          message: "Sign in successful",
          buttons: ['Dismiss'],
        }))),
      )
      .subscribe(_ => this.router.navigate(['tabs']));
  }

}
