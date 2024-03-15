import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatOption } from "@angular/material/autocomplete";
import { Observable, filter, map, startWith, tap } from 'rxjs';
import { DropDowns, DropDownOptions } from '../../../model/elements';
@Component({
  selector: 'app-filter-dropdown-box',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  templateUrl: './filter-dropdown-box.component.html',
  styleUrl: './filter-dropdown-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterDropdownBoxComponent {
  control = input.required<FormControl>();
  @Input({ required: true }) ctrl!: DropDowns;

  ngOnInit(): void {
    // this.control = new FormControl(this.ctrl.value);
    // if (this.ctrl.required)
    //   this.control.addValidators(Validators.required);
    // this.ctrl.validators?.forEach(x => {
    //   this.control.addValidators(x)
    // });

    // this.form.addControl(this.ctrl.name, this.control);
    // this.options = this.control.valueChanges.pipe(
    //   startWith(''),
    //   filter(o => typeof o === 'string'),
    //   map(x => (x as string)?.toLowerCase()),
    //   map(x => this.values?.filter(o => (o?.key as string)?.toLowerCase()?.includes(x))
    //   ))
  }

  get values() {
    return this.ctrl.options;
  }

  selectOption(o: any) {
    console.log(o)
  }

  displayFn(val: any | MatOption): any {
    if (!val)
      return null;
    if (typeof val === 'object') {
      return (val as MatOption).value;
    }
    return this.values?.find(o => o.value === val)!.key
  }
}
