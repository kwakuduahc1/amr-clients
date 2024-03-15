import { Injectable, signal } from '@angular/core';

interface IStates { isProcessing: boolean, message?: string }

@Injectable({ providedIn: 'root' })
export class ActivityProvider {
  act = signal<IStates>({ isProcessing: false, message: '' })

  constructor() { }

  beginProc() {
    this.act.set({ isProcessing: true })
  }


  endProc() {
    this.act.set({ isProcessing: false })
  }
}
