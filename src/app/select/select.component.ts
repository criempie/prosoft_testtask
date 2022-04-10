import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from "@angular/forms";
import { selectOptionInterface } from "../../types/types";

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
  options?: selectOptionInterface[] = [];

  @Input()
  label?: string;

  @Input()
  defaultSelected?: number;

  @Output()
  change_: EventEmitter<any> = new EventEmitter;

  private _value: string;

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

    this.change_.emit(this.options?.find(v => element.value === v.value.toString()));
    this.value = element.value;
  }
}
