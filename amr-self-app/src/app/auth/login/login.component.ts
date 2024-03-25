import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonInput, IonItem, IonButton, IonIcon, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personAddOutline, logInSharp } from 'ionicons/icons';
import { filter, from } from 'rxjs';
import { StatusProvider } from 'src/app/providers/StatusProvider';
import { LoginVm } from 'src/model/IUsers';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonIcon, IonList,
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
    IonIcon,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private http = inject(StatusProvider);
  private toast = inject(ToastController);
  private mod = inject(ModalController);
  private fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    userName: this.fb.control<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    password: this.fb.control<string>('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
  })

  constructor(private router: Router) {
    addIcons({ personAddOutline, logInSharp });
  }
  login(usr: LoginVm) {
    this.http.login(usr)
      .subscribe(_ => this.toast.create({
        header: 'Authentication/Authorization',
        message: "Sign in successful",
        buttons: ['Dismiss'],
      }));
  }

  register() {
    const top = this.mod.getTop();
    from(top).pipe(filter(x => !!x)).subscribe(x => x?.dismiss());
    this.router.navigate(['/tabs/auth/register']);
  }
}
