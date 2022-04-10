import { Injectable } from '@angular/core';
import { ConsumerInterface, ConsumerWithoutIdInterface } from "../../types/types";
import { Subject, Subscription } from "rxjs";
import { APIUrl } from "../../config";
import { PlugService } from "./plug.service";

@Injectable({
  providedIn: 'root'
})
export class ConsumersService {
  private _consumers: ConsumerInterface[] = [];

  get consumers(): ConsumerInterface[] {
    return this._consumers;
  }

  private readonly _consumersViewableSubject: Subject<ConsumerInterface[]> = new Subject;
  private readonly _consumersSubject: Subject<ConsumerInterface[]> = new Subject;

  private _filterSettings: { key: keyof ConsumerInterface | null, value: any } = {
    key: null,
    value: null
  }

  private static _filter(consumers: ConsumerInterface[],
                         settings: { key: keyof ConsumerInterface | null, value: any }) {
    if (!settings.key || !settings.value) return consumers;

    const temp = consumers.slice();
    //@ts-ignore
    return temp.filter(v => v[settings.key] === settings.value);
  }

  private static _fetchConsumers(): Promise<Response> {
    return fetch(`${ APIUrl }/consumers`, {
      method: 'GET',
    })
  }

  constructor(private plugService: PlugService) {
    if (!APIUrl) {
      this._consumers = plugService.consumers;
      plugService.subscribe(v => {
          this._consumers = v;
          this._consumersSubject.next(v);
          this._consumersViewableSubject.next(v);
        }
      );
    } else {
      this._consumersSubject.subscribe(v => this._consumers = v);
      ConsumersService._fetchConsumers()
                      .then(j => j.json())
                      .then(v => {
                        this._consumersSubject.next(v);
                        this._consumersViewableSubject.next(v)
                      })
                      .catch(e => console.error(e))
    }
  }

  public setFilterSettings(settings: { key: keyof ConsumerInterface, value: any }) {
    this._filterSettings = settings;

    this._consumersViewableSubject
        .next(ConsumersService._filter(this._consumers, settings));
  }

  public filter() {
    this._consumersViewableSubject
        .next(ConsumersService._filter(this._consumers, this._filterSettings))
  }

  public subscribe(fn: (v: ConsumerInterface[]) => void): Subscription {
    return this._consumersViewableSubject.subscribe(fn);
  }

  public updateConsumers() {
    if (APIUrl) {
      ConsumersService._fetchConsumers();
    }

    this.filter();
  }

  public deleteConsumer(consumer: ConsumerInterface): Promise<any> {
    if (APIUrl) {
      return fetch(`${ APIUrl }/consumers/${ consumer.id }`, {
        method: 'DELETE'
      })
    } else {
      this.plugService.deleteConsumer(consumer.id);
      return new Promise<any>(res => res(null));
    }
  }

  public editConsumer(consumer: ConsumerInterface): Promise<any> {
    if (APIUrl) {
      return fetch(`${ APIUrl }/consumers/${ consumer.id }`, {
        method: 'PATCH',
        body: JSON.stringify(consumer)
      })
    } else {
      this.plugService.editConsumer(consumer);
      return new Promise<any>(res => res(null));
    }
  }

  public addConsumer(consumer: ConsumerWithoutIdInterface): Promise<any> {
    if (APIUrl) {
      return fetch(`${ APIUrl }/consumers`, {
        method: 'PUT',
        body: JSON.stringify(consumer)
      })
    } else {
      this.plugService.putConsumer(consumer);
      return new Promise<any>(res => res(null));
    }
  }
}
