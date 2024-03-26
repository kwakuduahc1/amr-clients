import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Injectable({ providedIn: 'root' })
export class NativeService {
    private isNative = Capacitor.isNativePlatform();
    get native() { return this.isNative; }
}