import { Injectable } from '@angular/core';
import { ConsumerInterface, ConsumerWithoutIdInterface } from "../../types/controlsConfig.type";

@Injectable({
  providedIn: 'root'
})
export class PlugService {
  private _consumers: ConsumerInterface[] = [];

  get consumers() {
    return this._consumers;
  }

  getConsumers(): ConsumerInterface[] {
    return this._consumers;
  }

  putConsumer(consumer: ConsumerWithoutIdInterface) {
    this._consumers.push(<ConsumerInterface>{
      ...consumer,
      id: Date.now()
    })
  }

  constructor() {
    this._consumers = require("../../consumers.plug.json").consumers;

  }
}
