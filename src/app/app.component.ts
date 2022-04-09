import { Component, OnInit } from '@angular/core';
import {
  ConsumerInterface,
  ConsumerWithoutIdInterface,
  controlsConfigInterface,
  inputTypes, selectOptionInterface
} from "../types/controlsConfig.type";
import { buttonInColumn } from "./table/table.component";
import { ConsumersService } from "./services/consumers.service";

const REQUIRED = () => 'Поле обязательно';
const MAX_LENGTH = (length: number | string) => `Максимальная длина ${ length }`;
const EQUAL_LENGTH = (length: number | string) => `Необходима длина ${ length }`;

const controlsConfig: controlsConfigInterface = {
  id: {
    initValue: null,
    type: inputTypes.id,
    hidden: true
  },
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
    inputType: 'number',
    validator: function (control) {
      const value = control.value;
      const errors: { [key: string]: string } = {};

      if (!value) errors['required'] = REQUIRED();
      if (value.toString().length !== 13) errors['equalLength'] = EQUAL_LENGTH(13);

      if (Object.keys(errors).length === 0) return null
      else return errors
    },
    inputTitle: 'Номер',
    inputPlaceholder: 'Введите номер...'
  }
};

function controlsConfigForEdit(consumer: ConsumerInterface,
                               controlsConfig: controlsConfigInterface): controlsConfigInterface {
  const config: controlsConfigInterface = {};
  const controlsConfigKeys = <[keyof ConsumerInterface]>Object.keys(controlsConfig);

  controlsConfigKeys.forEach(key => {
    config[key] = {
      ...controlsConfig[key],
      initValue: consumer[key]
    }
  })

  return config;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  modalFlags = {
    addConsumer: false,
    editConsumer: false,
  }

  controlsConfig: controlsConfigInterface = controlsConfig;
  controlsConfigForEdit: controlsConfigInterface;

  consumers: ConsumerInterface[] = [];
  consumerFormatters: { [key: string]: (v: any) => any } = {
    name: (v) => v,
    type: (v: number) => v === 1 ? "Ф" : v === 2 ? "Ю" : null,
    number: (v) => v
  }
  consumerTableButtons: buttonInColumn[] = [
    {
      iconPath: "../assets/trash.svg",
      onClick: this.deleteConsumer.bind(this)
    },
    {
      iconPath: "../assets/edit.svg",
      onClick: this.openModalEditConsumer.bind(this)
    }
  ]

  consumerHints: {[key: string]: (v: any) => string | null} = {
    'type': (v) => v === 1 ? "Физическое лицо" : v === 2 ? "Юридическое лицо" : null
  }

  filterOptions: selectOptionInterface[] = [
    {
      title: 'Физические лица',
      value: 1
    },
    {
      title: 'Юридические лица',
      value: 2
    }
  ]

  constructor(private consumersService: ConsumersService) {
    this.closeModalAddConsumer = this.closeModalAddConsumer.bind(this);
  }

  public ngOnInit() {
    this.consumers = this.consumersService.consumers;
    this.consumersService.subscribe((v) => {this.consumers = v});
  }

  openModalAddConsumer(): void {
    this.modalFlags.addConsumer = true;
  }

  closeModalAddConsumer(): void {
    this.modalFlags.addConsumer = false;
  }

  closeModalEditConsumer(): void {
    this.modalFlags.editConsumer = false;
  }

  openModalEditConsumer(consumer: ConsumerInterface): void {
    this.controlsConfigForEdit = controlsConfigForEdit(consumer, this.controlsConfig);
    this.modalFlags.editConsumer = true;
  }

  addConsumer(consumer: ConsumerWithoutIdInterface) {
    this.consumersService
        .addConsumer(consumer)
        .then(() => {
          this.closeModalAddConsumer();
          this.consumersService.updateConsumers();
        })
        .catch(e => console.error(e))
  }

  editConsumer(consumer: ConsumerInterface) {
    this.consumersService
        .editConsumer(consumer)
        .then(() => {
          this.closeModalEditConsumer();
          this.consumersService.updateConsumers();
        })
        .catch(e => console.error(e))
  }

  deleteConsumer(consumer: ConsumerInterface) {
    this.consumersService
        .deleteConsumer(consumer)
        .then(() => {this.consumersService.updateConsumers()})
        .catch(e => console.error(e))
  }

  addConsumerOutputFormat(data: { [key: string]: any }) {
    return {
      name: data['name'],
      type: Number(data['type']),
      number: Number(data['number'])
    }
  }

  editConsumerOutputFormat(data: { [key: string]: any }) {
    return {
      id: Number(data['id']),
      name: data['name'],
      type: Number(data['type']),
      number: Number(data['number'])
    }
  }

  filterConsumers(key: keyof ConsumerInterface, value: any) {
    this.consumersService.setFilterSettings({ key, value });
  }
}
