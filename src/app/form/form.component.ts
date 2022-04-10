import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { controlsConfigInterface, inputTypes } from "../../types/types";

@Component({
  selector: 'MyForm',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  @Input()
  controlsConfig: controlsConfigInterface;

  controlsConfigKeys: string[];

  @Input()
  submitButtonText?: string = 'Подтвердить';

  @Input()
  outputFormat?: (values: { [key: string]: any }) => { [key: string]: any };

  inputTypes = inputTypes;

  @Output()
  onSubmit: EventEmitter<any> = new EventEmitter;

  public ngOnInit() {
    this.controlsConfigKeys = Object.keys(this.controlsConfig);
    const config: { [key: string]: any } = {};
    Object.keys(this.controlsConfig)
          .forEach((key: string) => {
            config[key] = [this.controlsConfig[key].initValue, this.controlsConfig[key].validator];
          })
    this.form = this.fb.group(config);
  }

  public isValid(): boolean {
    return Object.values(this.form.controls)
                 .every((control) => !control.errors)
  }

  submit = () => {
    if (this.isValid()) {
      this.onSubmit.emit(this.outputFormat
                         ? this.outputFormat(this.form.value)
                         : this.form.value);
    }
  }

}
