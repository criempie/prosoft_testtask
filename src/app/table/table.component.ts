import { Component, Input, OnInit } from '@angular/core';

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

  constructor() {

  }

  ngOnInit(): void {

  }

}
