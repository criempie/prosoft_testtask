import { Component, Input, OnInit } from '@angular/core';

export interface buttonInColumn {
  iconPath: string,
  onClick: (v?: any) => void,
  alt?: string
}

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

  constructor() {

  }

  ngOnInit(): void {
    if (this.buttons) {
      this.gridTemplateColumns =  this.gridTemplateColumns
                                      .concat(this.buttons.map(() => this.iconSize));
    }
  }

}
