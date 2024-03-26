import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonIcon, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonButton, ModalController, ToastController, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personAddOutline, logInSharp } from 'ionicons/icons';
import { from, filter, switchMap, map, Observable } from 'rxjs';
import { LoginHttpService } from 'src/app/http/login-http-service';
import { StatusProvider } from 'src/app/providers/StatusProvider';
import { LoginVm, RegisterParticipantVm, RegisterVm } from 'src/model/IUsers';
import { GoogleMap } from '@angular/google-maps';
import { LocationProviderService } from 'src/app/providers/LocationService';
import { LocationGetterService } from 'src/app/http/location-http-service';

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
    IonIcon,
    IonSelect,
    IonSelectOption,
    GoogleMap,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {

  private http = inject(LoginHttpService);
  private toast = inject(ToastController);
  private status = inject(StatusProvider);
  private mod = inject(ModalController);
  loc_http = inject(LocationGetterService);
  private loc = inject(LocationProviderService)
  private fb = inject(NonNullableFormBuilder);
  pns = this.fb.array<string>([]);
  form = this.fb.group({
    password: this.fb.control<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    confirmPassword: this.fb.control<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    fullName: this.fb.control<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
    email: this.fb.control<string>('', [Validators.minLength(5), Validators.maxLength(30)]),
    phoneNumber: this.pns,
    role: this.fb.control<string>('Participant', [Validators.minLength(8), Validators.maxLength(30)]),
    age: this.fb.control<number>(NaN, [Validators.min(1), Validators.max(100)]),
    locality: this.fb.control<string>('', [Validators.minLength(2), Validators.maxLength(100)]),
    gender: this.fb.control<string>('', [Validators.minLength(4), Validators.maxLength(6)]),
    longitude: this.fb.control<number>(NaN),
    latitude: this.fb.control<number>(NaN)
  });

  mapOpts: Observable<google.maps.MapOptions> = this.loc.loc.pipe(
    map(x => {
      return {
        center: {
          lng: x.coords.longitude,
          lat: x.coords.latitude,
        },
        zoom: 14,
      }
    })
  )

  constructor(private router: Router) {
    addIcons({ personAddOutline, logInSharp });
    for (let i = 0; i < 2; i++) {
      this.pns.push(this.fb.control('', [Validators.minLength(10), Validators.maxLength(10)]))
    }
  }

  head($event: any) {
    console.log($event);
  }

  moveMap(event: google.maps.MapMouseEvent) {
    const { lat, lng } = event.latLng!;
    this.form.get('latitude')!.patchValue(lat());
    this.form.get('longitude')!.patchValue(lng());
    this.loc_http.getLocale(lng(), lat())
      .subscribe(r => this.form.get('locality')?.patchValue(r));
  }

  get _pns() {
    return this.pns.controls;
  }

  register(usr: Omit<RegisterParticipantVm, 'participantName' | 'userName'>) {
    let pat: RegisterParticipantVm = { ...usr, userName: usr.phoneNumber[0], participantName: usr.fullName };
    this.http.register(pat)
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


