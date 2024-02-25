import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Transaction } from '../transaction.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-transaction-modal',
  templateUrl: './create-transaction-modal.component.html',
  styleUrls: ['./create-transaction-modal.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class CreateTransactionModalComponent {
  newTransaction: Transaction = {
    date: '', description: '', amount: 0,
    id: 0
  };
  @Output() closeModalEvent = new EventEmitter();
  @Output() createTransactionEvent = new EventEmitter<any>();

  submitForm() {
    this.createTransactionEvent.emit(this.newTransaction);
    this.closeModal();
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}
