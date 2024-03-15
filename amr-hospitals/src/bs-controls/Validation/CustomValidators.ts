import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DropDownOptions } from '../model/elements';

export function maxDateValidator(maxDate: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null; // If the control is empty, don't perform validation
        }

        return new Date(control.value) < maxDate ? null : { maxDate: { max: maxDate } };
    };
}


export function maxDateTodayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null; // If the control is empty, don't perform validation
        }
        let date = new Date();
        return new Date(control.value) < date ? null : {
            maxTodayDate: {
                max: date
            }
        };
    };
}

export function minDateTodayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null; // If the control is empty, don't perform validation
        }

        const date = new Date();
        return new Date(control.value) > date ? null : {
            minDate: {
                min: {
                    min: date
                }
            }
        };
    };
}

export function minDateValidator(minDate: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null; // If the control is empty, don't perform validation
        }
        return new Date(control.value) > minDate ? null : {
            minDate: {
                min: minDate
            }
        };
    };
}

export function filterDropdownValidator(list: DropDownOptions[]): ValidatorFn {
    return control => {
        const val = control.value;
        if (!val) return null;
        if (val.length > 1 && val.trim().length === 0) return { inList: true };
        return list.find(l => l.value === val) ? null : { inList: true };
    };
}