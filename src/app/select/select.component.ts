import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from "@angular/forms";
import { selectOption } from "../../types/controlsConfig.type";

@Component({
  selector: 'MySelect',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }]
})
export class SelectComponent implements ControlValueAccessor {
  @Input()
  options?: selectOption[] = [];

  @Input()
  label?: string;

  private _value: string;

  @Input()
  set value(v: string) {
    this._value = v;
    this.onChange(this._value);
  }

  get value() {
    return this._value;
  }

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

  constructor() { }

  onChange(_: any) {}

  public writeValue(value: any) {
    this.value = value;
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {}

  public onSelectChange(target: any) {
    const element = <HTMLSelectElement>target;

    this.onChange(element.value);
  }
}
