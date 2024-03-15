import { Injectable, inject } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Subject, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenProvider {
  private store = inject(StorageMap);
  token = new Subject<string>();

  get bearer() {
    return this.token;
  }

  constructor() {
    this.store.get<string>('jwt', { type: 'string' })
      .pipe(tap(p => {
        this.token.next(p as string);
      }))
      .subscribe(p => this.getHeader())
  }

  setToken(value: string) {
    this.token.next(value);
    return this.store.set('jwt', value);
  }

  getHeader() {
    return this.store.get('jwt').pipe(
      map(x => `Bearer ${x}`)
    )

  }
}
