import { Injectable } from '@angular/core';
import { ConsumerInterface, ConsumerWithoutIdInterface } from "../../types/types";
import { Subject, Subscription } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlugService {
  private readonly _consumers: Subject<ConsumerInterface[]> = new Subject;
  private _consumersValue: ConsumerInterface[];

  get consumers() {
    return this._consumersValue;
  }

  constructor() {
    this._consumers.subscribe(v => { this._consumersValue = v });
    this._consumers.next(require("../../consumers.plug.json").consumers);
  }

  public putConsumer(consumer: ConsumerWithoutIdInterface) {
    this._consumersValue.push(<ConsumerInterface>{
      ...consumer,
      id: Date.now()
    })

    this._consumers.next(this._consumersValue);
  }

  public deleteConsumer(id: number) {
    this._consumers.next(this._consumersValue.filter(v => v.id !== id));
  }

  public editConsumer(consumer: ConsumerInterface) {
    const editableIndex = this._consumersValue.findIndex(c => c.id === consumer.id);

    if (editableIndex !== -1) {
      const newConsumers = this._consumersValue.slice();
      newConsumers[editableIndex] = consumer;

      this._consumers.next(newConsumers);
    }
  }

  public subscribe(func: (v: any) => void): Subscription {
    return this._consumers.subscribe(func);
  }
}
