import { Component } from '@angular/core';
import { controlsConfig, inputTypes } from "../types/controlsConfig.type";

const REQUIRED = () => 'Поле обязательно';
const MAX_LENGTH = (length: number | string) => `Максимальная длина ${length}`;
const EQUAL_LENGTH = (length: number | string) => `Необходима длина ${length}`;

const controlsConfig: controlsConfig = {
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
    initValue: '',
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
export class AppComponent {
  modalAddConsumerFlag = true;
  controlsConfig: controlsConfig = controlsConfig;

  constructor() {
    this.closeModalAddConsumer = this.closeModalAddConsumer.bind(this);
  }

  openModalAddConsumer(): void {
    this.modalAddConsumerFlag = true;
  }

  closeModalAddConsumer(): void {
    this.modalAddConsumerFlag = false;
  }

}
