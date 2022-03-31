import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'Modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() title: string = '';
  @Input() onClose: () => void = () => {};

  constructor() { }

  ngOnInit(): void {

  }

}
