import { Component, Input, OnInit } from '@angular/core';
import { buttonInColumn } from "../../types/types";

@Component({
  selector: 'MyTable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  public iconSize: string = '24px';

  @Input()
  data: any[];
  public Object: any = Object;

  @Input()
  formatters?: { [key: string]: (v: any) => any };

  @Input()
  disabledFields?: string[];

  @Input()
  buttons?: buttonInColumn[] = [];

  @Input()
  gridTemplateColumns: string[] = [];

  @Input()
  hints?: {[key: string]: (v: any) => string | null};

  ngOnInit(): void {
    if (this.buttons) {
      this.gridTemplateColumns =  this.gridTemplateColumns
                                      .concat(this.buttons.map(() => this.iconSize));
    }
  }

}
