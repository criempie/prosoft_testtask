import { Component, EventEmitter, Input, Output } from '@angular/core';
import { selectOptionInterface } from "../../types/controlsConfig.type";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Input()
  options: selectOptionInterface[] = [];

  @Output()
  filterFn: EventEmitter<selectOptionInterface | undefined> = new EventEmitter;

  constructor() { }

  filter(obj: selectOptionInterface) {
    this.filterFn.emit(obj);
  }


}
