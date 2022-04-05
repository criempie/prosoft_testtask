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

  @Input()
  data: any[];
  public Object: any = Object;

  @Input()
  formatters?: { [key: string]: (v: any) => any };

  @Input()
  disabledFields?: string[];

  @Input()
  buttons?: buttonInColumn[] = [];

  constructor() {

  }

  ngOnInit(): void {

  }

}
