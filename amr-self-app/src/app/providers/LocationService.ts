import { Injectable, inject } from '@angular/core';
import { catchError, filter, from, iif, of, switchMap, tap, throwError } from 'rxjs';
import { Geolocation, Position } from '@capacitor/geolocation';
import { PermissionState } from '@capacitor/core';
import { NativeService } from './Nativeservice';

@Injectable({ providedIn: 'any' })
export class LocationProviderService {
    coords!: Position;
    native = inject(NativeService).native;
    loc = from(Geolocation.checkPermissions())
        .pipe(
            switchMap(x => iif(() => x.coarseLocation === 'prompt' || x.coarseLocation === 'denied', this.prompt(),
                iif(() => x.coarseLocation === 'prompt-with-rationale', this.prompt('Kindly allow location access'), of(null)))),
            filter(x => !x),
            switchMap(() => this.getLoc()),
        )

    locStatus(status: PermissionState) {
        switch (status) {
            case 'granted':
                return true;
            default:
                return false
        }
    }

    prompt(message?: string) {
        if (this.native) {
            return from(Geolocation.requestPermissions({
                permissions: ['coarseLocation', 'location']
            }))
                .pipe(
                    switchMap(_ => this.getLoc()),
                    catchError((e: GeolocationPositionError) => e.message),
                    tap(x => console.log('The message is ' + x)))
        }
        else {
            return of(null)
        }
    }

    getLoc() {
        return from(Geolocation.getCurrentPosition())
    }
}