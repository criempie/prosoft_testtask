import { Component, OnInit } from '@angular/core';
import {
  buttonInColumn,
  ConsumerInterface,
  ConsumerWithoutIdInterface,
  controlsConfigInterface,
  selectOptionInterface
} from "../types/types";
import { ConsumersService } from "./services/consumers.service";
import { controlsConfig } from "./controlsConfig";


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

  public openModalAddConsumer(): void {
    this.modalFlags.addConsumer = true;
  }

  public closeModalAddConsumer(): void {
    this.modalFlags.addConsumer = false;
  }

  public closeModalEditConsumer(): void {
    this.modalFlags.editConsumer = false;
  }

  public openModalEditConsumer(consumer: ConsumerInterface): void {
    this.controlsConfigForEdit = controlsConfigForEdit(consumer, this.controlsConfig);
    this.modalFlags.editConsumer = true;
  }

  public addConsumer(consumer: ConsumerWithoutIdInterface) {
    this.consumersService
        .addConsumer(consumer)
        .then(() => {
          this.closeModalAddConsumer();
          this.consumersService.updateConsumers();
        })
        .catch(e => console.error(e))
  }

  public editConsumer(consumer: ConsumerInterface) {
    this.consumersService
        .editConsumer(consumer)
        .then(() => {
          this.closeModalEditConsumer();
          this.consumersService.updateConsumers();
        })
        .catch(e => console.error(e))
  }

  public deleteConsumer(consumer: ConsumerInterface) {
    this.consumersService
        .deleteConsumer(consumer)
        .then(() => {this.consumersService.updateConsumers()})
        .catch(e => console.error(e))
  }

  public addConsumerOutputFormat(data: { [key: string]: any }) {
    return {
      name: data['name'],
      type: Number(data['type']),
      number: Number(data['number'])
    }
  }

  public editConsumerOutputFormat(data: { [key: string]: any }) {
    return {
      id: Number(data['id']),
      name: data['name'],
      type: Number(data['type']),
      number: Number(data['number'])
    }
  }

  public filterConsumers(key: keyof ConsumerInterface, value: any) {
    this.consumersService.setFilterSettings({ key, value });
  }
}
