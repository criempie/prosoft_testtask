import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from "@angular/forms";

@Component({
  selector: 'MyInput',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input()
  label?: string;

  @Input()
  placeholder?: string;

  @Input()
  type?: string;

  private _errors: string[] = [];

  @Input()
  set errors(errors: ValidationErrors | null) {
    if (errors) {
      this._errors = Object.values(errors);
    } else {
      this._errors = [];
    }
  }

  get errors(): string[] {
    return this._errors;
  }

  private _value: string;

  get value(): string {
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

  public onInputChange(target: any) {
    const element = <HTMLInputElement>target;

    this.onChange(element.value);
  }
}
