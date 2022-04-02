import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { controlsConfig, inputTypes } from "../../types/controlsConfig.type";

@Component({
  selector: 'MyForm',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  @Input()
  controlsConfig: controlsConfig;

  controlsConfigKeys: string[];
  inputTypes = inputTypes;

  public ngOnInit() {
    this.controlsConfigKeys = Object.keys(this.controlsConfig);
    const config: { [key: string]: any } = {};
    Object.keys(this.controlsConfig)
          .forEach((key: string) => {
            config[key] = [ this.controlsConfig[key].initValue, this.controlsConfig[key].validator ];
          })
    this.form = this.fb.group(config);

    //setInterval(() => {
    //  console.log(this.form);
    //}, 1000)
  }

  public isValid(): boolean {
    return Object.values(this.form.controls)
                 .every((control) => !control.errors)
  }

  submit = () => {
    console.log(this.isValid())
  }

}
