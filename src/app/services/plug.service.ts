import { Injectable } from '@angular/core';
import { ConsumerInterface, ConsumerWithoutIdInterface } from "../../types/controlsConfig.type";
import { Subject, Subscription } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlugService {
  private readonly _consumers: Subject<ConsumerInterface[]>;
  private _consumersValue: ConsumerInterface[];

  get consumers() {
    return this._consumersValue;
  }

  putConsumer(consumer: ConsumerWithoutIdInterface) {
    this._consumersValue.push(<ConsumerInterface>{
      ...consumer,
      id: Date.now()
    })
  }

  deleteConsumer(id: number) {
    this._consumers.next(this._consumersValue.filter(v => v.id !== id));
  }

  subscribe(func: (v: any) => void): Subscription {
    return this._consumers.subscribe(func);
  }

  constructor() {
    this._consumers = new Subject();
    this._consumers.subscribe(v => {this._consumersValue = v});
    this._consumers.next(require("../../consumers.plug.json").consumers);
  }
}
