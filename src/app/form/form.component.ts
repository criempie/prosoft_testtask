import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ConsumerWithoutIdInterface, controlsConfigInterface, inputTypes } from "../../types/controlsConfig.type";
import { PlugService } from "../services/plug.service";
import { APIUrl } from "../../config";

@Component({
  selector: 'MyForm',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private plugService: PlugService) {}

  @Input()
  controlsConfig: controlsConfigInterface;

  controlsConfigKeys: string[];
  inputTypes = inputTypes;

  @Output()
  onSubmit: any = new EventEmitter;

  public ngOnInit() {
    this.controlsConfigKeys = Object.keys(this.controlsConfig);
    const config: { [key: string]: any } = {};
    Object.keys(this.controlsConfig)
          .forEach((key: string) => {
            config[key] = [this.controlsConfig[key].initValue, this.controlsConfig[key].validator];
          })
    this.form = this.fb.group(config);
  }

  private static _transformToConsumer(data: any) {
    return <ConsumerWithoutIdInterface>{
      name: data.name,
      type: data.type,
      number: data.number,
    }
  }

  private _putNewConsumer(consumer: ConsumerWithoutIdInterface, callback?: (() => void) | null) {
    if (APIUrl) {
      fetch(`${ APIUrl }/consumers`, {
        method: 'PUT',
        body: JSON.stringify(consumer)
      })
        .then(() => callback && callback())
        .catch(() => callback && callback())
    } else {
      this.plugService.putConsumer(consumer);
      if (callback) callback();
    }
  }

  public isValid(): boolean {
    return Object.values(this.form.controls)
                 .every((control) => !control.errors)
  }

  submit = () => {
    if (this.isValid()) {
      this._putNewConsumer(FormComponent._transformToConsumer(this.form.value), () => {this.onSubmit && this.onSubmit.emit()})
    }
  }

}
