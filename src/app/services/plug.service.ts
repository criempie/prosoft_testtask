import { Injectable } from '@angular/core';
import { ConsumerInterface, ConsumerWithoutIdInterface } from "../../types/controlsConfig.type";
import { Subject, Subscription } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlugService {
  private readonly _consumers: Subject<ConsumerInterface[]>;
  private _consumersValue: ConsumerInterface[];
  private readonly  _consumersFiltered: Subject<ConsumerInterface[]>;
  private _consumersValueFiltered: ConsumerInterface[];

  private _consumersFilterSettings: {key: keyof ConsumerInterface, value: any} = {
    key: 'type',
    value: null
  }
  set consumersFilterSettings(newSettings: {key: keyof ConsumerInterface, value: any}) {
    this._consumersFilterSettings = Object.assign(newSettings, {});
    this._consumersFiltered.next(this.filterConsumers(this._consumersValue, newSettings));
  }

  get consumers() {
    console.log(this._consumersValueFiltered)
    return this._consumersValueFiltered;
  }

  putConsumer(consumer: ConsumerWithoutIdInterface) {
    this._consumersValue.push(<ConsumerInterface>{
      ...consumer,
      id: Date.now()
    })

    this._consumers.next(this._consumersValue);
  }

  deleteConsumer(id: number) {
    this._consumers.next(this._consumersValue.filter(v => v.id !== id));
  }

  editConsumer(consumer: ConsumerInterface) {
    const editableIndex = this._consumersValue.findIndex(c => c.id === consumer.id);

    if (editableIndex !== -1) {
      const newConsumers = this._consumersValue.slice();
      newConsumers[editableIndex] = consumer;

      this._consumers.next(newConsumers);
    }
  }

  filterConsumers(consumers: ConsumerInterface[], settings: {key: keyof ConsumerInterface, value: any}) {
    if (!settings.value) return consumers;

    const temp = consumers.slice();
    return temp.filter(v => v[settings.key] === settings.value);
  }

  subscribe(func: (v: any) => void): Subscription {
    return this._consumersFiltered.subscribe(func);
  }

  constructor() {
    this._consumers = new Subject();
    this._consumersFiltered = new Subject();
    this._consumers.subscribe(v => {
      this._consumersValue = v;
      this._consumersFiltered.next(this.filterConsumers(v, this._consumersFilterSettings));
    });
    this._consumersFiltered.subscribe(v => {this._consumersValueFiltered = v})
    this._consumers.next(require("../../consumers.plug.json").consumers);
  }
}
