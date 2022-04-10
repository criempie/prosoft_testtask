import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'Modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() title: string = '';
  @Output() onClose: EventEmitter<void> = new EventEmitter;

  close() {
    this.onClose.emit();
  }
}
