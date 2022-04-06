import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'Modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() title: string = '';
  @Output() onClose: EventEmitter<void> = new EventEmitter;

  close() {
    this.onClose.emit();
  }

  constructor() { }

  ngOnInit(): void {

  }

}
