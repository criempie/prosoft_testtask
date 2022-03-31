import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
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

  get value() {
    return this._value;
  }

  @Input()
  set value(v: string) {
    this._value = v;
    this.onChange(this._value);
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
