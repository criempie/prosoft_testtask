import { Component } from '@angular/core';
import { controlsConfig, inputTypes } from "../types/controlsConfig.type";

const controlsConfig: controlsConfig = {
  name: {
    initValue: '',
    type: inputTypes.inputtext,
    validator: (value => Boolean(value && value.length <= 255)),
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
    validator: (value => Boolean(value)),
    inputTitle: 'Тип',
  },
  number: {
    initValue: '',
    type: inputTypes.inputtext,
    validator: (value => Boolean(value && value.toString().length === 13)),
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
