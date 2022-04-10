import { Component, EventEmitter, Input, Output } from '@angular/core';
import { selectOptionInterface } from "../../types/types";

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

  filter(obj: selectOptionInterface) {
    this.filterFn.emit(obj);
  }
}
