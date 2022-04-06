import { Component, OnInit } from '@angular/core';
import {
  ConsumerInterface,
  ConsumerWithoutIdInterface,
  controlsConfigInterface,
  inputTypes
} from "../types/controlsConfig.type";
import { APIUrl } from "../config";
import { PlugService } from "./services/plug.service";
import { buttonInColumn } from "./table/table.component";

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

  constructor(private plugService: PlugService) {
    this.closeModalAddConsumer = this.closeModalAddConsumer.bind(this);
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

  deleteConsumer(consumer: ConsumerInterface) {
    if (APIUrl) {
      fetch(`${ APIUrl }/consumers`, {
        method: 'DELETE',
        body: JSON.stringify({ id: consumer.id })
      })
    } else {
      this.plugService.deleteConsumer(consumer.id);
    }
  }

  editConsumer(consumer: ConsumerInterface) {
    if (APIUrl) {
      fetch(`${ APIUrl }/consumers`, {
        method: 'PATCH',
        body: JSON.stringify(consumer)
      })
        .then(() => {this.closeModalEditConsumer()})
        .catch(() => {})
    } else {
      this.plugService.editConsumer(consumer);
      this.closeModalEditConsumer()
    }
  }

  addConsumer(consumer: ConsumerWithoutIdInterface) {
    console.log(consumer)
    if (APIUrl) {
      fetch(`${ APIUrl }/consumers`, {
        method: 'PUT',
        body: JSON.stringify(consumer)
      })
        .then(() => {this.closeModalAddConsumer()})
        .catch(() => {})
    } else {
      this.plugService.putConsumer(consumer);
      this.closeModalAddConsumer()
    }
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
}
