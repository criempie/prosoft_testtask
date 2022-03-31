import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { controlsConfig, inputTypes } from "../../types/controlsConfig.type";

class Consumer {
  name: string;
  type: 1 | 2;
  number: number;

  constructor(
    name: string,
    type: 1 | 2,
    number: number
  ) {
    if (Consumer.nameValidator(name)) this.name = name;
    if (Consumer.typeValidator(type)) this.type = type;
    if (Consumer.numberValidator(number)) this.number = number;
  }

  static nameValidator(name: string): boolean {
    return Boolean(
      name && name.length <= 255
    );
  };

  static typeValidator(type: 1 | 2): boolean {
    return Boolean(
      type
    );
  };

  static numberValidator(number: number): boolean {
    return Boolean(
      number && number.toString().length === 13
    );
  };
}

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
            config[key] = this.controlsConfig[key].initValue;
          })
    this.form = this.fb.group(config);

    setInterval(() => {
      console.log(this.form.value);
    }, 1000)
  }

  submit = () => {
    console.log(123123)
  }

}
