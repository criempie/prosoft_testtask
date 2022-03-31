import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors,
  Validator
} from "@angular/forms";

@Component({
  selector: 'MyInput',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: InputComponent,
      multi: true
    }],
})
export class InputComponent implements ControlValueAccessor, Validator {
  @Input()
  label?: string;

  @Input()
  placeholder?: string;

  private _value: string;

  get value() {
    return this._value;
  }

  @Input()
  set value(v: string) {
    this._value = v;
    this.onChange(this._value);
  }

  onChange(_: any) {}

  public writeValue(value: any) {
    this.value = value;
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {}

  public validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    return {
      error: "validation error"
    }
  }
}
