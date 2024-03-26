import { Component, computed, inject } from '@angular/core';
import { IonApp, IonRouterOutlet, IonItem, IonLabel } from '@ionic/angular/standalone';
import { StatusProvider } from './providers/StatusProvider';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonLabel, IonItem,
    IonApp,
    IonRouterOutlet,
    CommonModule
  ],
})
export class AppComponent {
  user = inject(StatusProvider);

  _user = computed(() => this.user.user());

}