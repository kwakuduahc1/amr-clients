import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";

export interface ValidationProperties {
    property: 'inList' | 'minLen' | 'maxLen' | 'max' | 'min' | 'minDate' | 'maxDate' | 'minTodayDate' | 'maxTodayDate';
    check: number | string | Date | null;
}

export interface FormProperties {
    icon: string;
    id: string;
    name: string;
    class?: string;
    legend?: string;
    btnText: string;
    isProcessing?: boolean;
    direction?: boolean;
}

export interface FormDataVm {
    name: string;
    value?: any;
    placeholder?: string;
    list?: any[];
    label: string;
    title?: string;
    required?: boolean;
    type?: 'text' | 'search' | 'tel' | 'password' | 'radio' | 'checkbox' | 'date' | 'datetime' | 'datetime-local';
    hidden?: boolean;
    options?: DropDownOptions[];
    color?: 'primary' | 'accent' | 'warn';
    validators?: ValidationProperties[],
    customValidators?: ('max_len' | 'min_len')[];
    asyncCustomValidators?: string[];
    depends?: {
        name: string;
        strategy: 'default' | 'value_min' | 'value_max' | 'value_equal'
    };
    children?: FormDataVm[],
    simpleChildren?: number,
    control_type: 'textbox' | 'password' | 'autocomplete' | 'radio' | 'checkbox' | 'dropdown' | 'number' | 'search' | 'free' | 'date';
}

export interface Controls {
    name: string;
    value: string;
    placeholder?: string;
    options?: DropDownOptions[],
    list?: string[],
    label: string;
    testID?: string;
    title?: string;
    required?: boolean;
    hidden?: boolean;
    type?: 'text' | 'search' | 'tel' | 'password' | 'radio' | 'checkbox' | 'date' | 'datetime' | 'datetime-local';
    validators?: ValidatorFn[],
    customValidators?: () => ValidatorFn[];
    asyncCustomValidators?: AsyncValidatorFn[];
    depends?: Controls;
    children?: Controls[];
    isChild?: boolean;
    control_type: 'textbox' | 'password' | 'autocomplete' | 'radio' | 'checkbox' | 'dropdown' | 'number' | 'search' | 'free' | 'date' | 'date-time';
}

export interface TextBoxes extends Controls {
    list?: string[];
}

export interface PasswordBoxes extends Controls {
}

export interface RadioBoxes extends Controls {
    type?: 'radio';
}

export interface CheckBoxes extends Controls {
    checked: boolean;
    color: 'primary' | 'accent' | 'warm'
}

export interface DatesBoxes extends Controls {
    min?: Date | string;
    max?: Date | string;
}

export interface DatesTimeBoxes extends Controls {
    min?: Date | string;
    max?: Date | string;
}

export interface NumberBoxes extends Controls {
}

export interface DropDowns extends Controls {
}

export interface DropDownOptions {
    key?: number | string | null;
    value: any
}

export interface DynamicTableData {
    [key: string]: string;
}

export interface TableHeaders {
    caption?: string;
    [key: string]: any;
}

export interface ListItems {
    [key: string]: any;
    meta?: any;
}