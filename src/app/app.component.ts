import { Component, OnInit } from '@angular/core';
import { ConsumerInterface, controlsConfigInterface, inputTypes } from "../types/controlsConfig.type";
import { APIUrl } from "../config";
import { PlugService } from "./services/plug.service";
import { buttonInColumn } from "./table/table.component";

const REQUIRED = () => 'Поле обязательно';
const MAX_LENGTH = (length: number | string) => `Максимальная длина ${ length }`;
const EQUAL_LENGTH = (length: number | string) => `Необходима длина ${ length }`;


const controlsConfig: controlsConfigInterface = {
  name: {
    initValue: '',
    type: inputTypes.inputtext,
    validator: function (control) {
      const value = control.value;
      const errors: { [key: string]: string } = {};

      if (!value) errors['required'] = REQUIRED();
      if (value.length > 255) errors['maxLength'] = MAX_LENGTH(255);

      if (Object.keys(errors).length === 0) return null
      else return errors

    },
    inputTitle: 'Имя',
    inputPlaceholder: 'Введите имя...'
  },
  type: {
    initValue: null,
    type: inputTypes.select,
    selectOptions: [
      {
        title: 'Физическое лицо',
        value: 1
      },
      {
        title: 'Юридическое лицо',
        value: 2
      }
    ],
    validator: function (control) {
      const value = control.value;
      const errors: { [key: string]: string } = {};

      if (!value) errors['required'] = REQUIRED();

      if (Object.keys(errors).length === 0) return null
      else return errors
    },
    inputTitle: 'Тип',
  },
  number: {
    initValue: '',
    type: inputTypes.inputtext,
    validator: function (control) {
      const value = control.value;
      const errors: { [key: string]: string } = {};

      if (!value) errors['required'] = REQUIRED();
      if (value.length !== 13) errors['equalLength'] = EQUAL_LENGTH(13);

      if (Object.keys(errors).length === 0) return null
      else return errors
    },
    inputTitle: 'Номер',
    inputPlaceholder: 'Введите номер...'
  }
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  modalAddConsumerFlag = false;
  controlsConfig: controlsConfigInterface = controlsConfig;

  consumers: ConsumerInterface[] = [];
  consumerFormatters: { [key: string]: (v: any) => any } = {
    name: (v) => v,
    type: (v) => v === '1' ? "Ф" : v === '2' ? "Ю" : null,
    number: (v) => v
  }
  consumerTableButtons: buttonInColumn[] = [
    {
      iconPath: "./src/asserts/trash.svg",
      onClick: this.deleteConsumer.bind(this)
    }
  ]

  constructor(private plugService: PlugService) {
    this.closeModalAddConsumer = this.closeModalAddConsumer.bind(this);
    //this.deleteConsumer = this.deleteConsumer.bind(this);
  }

  public ngOnInit() {
    if (APIUrl) {
      fetch(`${ APIUrl }/consumers`, {
        method: 'GET',
      })
        .then(response => {
          response.json()
                  .then(data => this.consumers = data);
        })
    } else {
      this.consumers = this.plugService.consumers;
      this.plugService.subscribe((v) => {this.consumers = v});
    }
  }

  openModalAddConsumer(): void {
    this.modalAddConsumerFlag = true;
  }

  closeModalAddConsumer(): void {
    this.modalAddConsumerFlag = false;
  }

  deleteConsumer(id: number) {
    if (APIUrl) {
      fetch(`${ APIUrl }/consumers`, {
        method: 'DELETE',
        body: JSON.stringify({ id })
      })
    } else {
      this.plugService.deleteConsumer(id);
    }
  }
}
