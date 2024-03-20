import { Directive, input } from '@angular/core';

@Directive({
  selector: 'data-cell',
  standalone: true,
  exportAs: 'data-cell',
  inputs: []
})
export class DataCellDirective {

  value = input.required<string>
  constructor() {
    console.log(this.value)
  }

}
