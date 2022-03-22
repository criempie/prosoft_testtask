import { Component, OnInit } from '@angular/core';

type consumer = {
  id: number,
  name: string,
  type: 1 | 2,
  number: number
};



@Component({
  selector: 'table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  consumers: consumer[] = [];



  constructor() {

  }

  ngOnInit(): void {
    fetch('https://my-json-server.typicode.com/criempie/JSONServer-rests/consumers', {
      method: 'GET',
    })
      .then(response => {
        response.json()
                .then(data => this.consumers = data);
      })
  }

}
