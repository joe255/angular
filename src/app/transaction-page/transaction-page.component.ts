import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionService } from '../transaction.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';
import { CreateTransactionModalComponent } from "../create-transaction-modal/create-transaction-modal.component";

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css'],
  standalone: true,
  imports: [CommonModule, SkeletonLoaderComponent, CreateTransactionModalComponent]
})
export class TransactionPageComponent implements OnInit {
  transactions: Transaction[] = [];
  isLoading = true;
  currentPage = 1;
  pageSize = 10;
  totalTransactions = 0; // Assume you can get this from your service or backend

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.isLoading = true;
    const pageIndex = this.currentPage - 0; // Adjust if your service uses 0-based index
    this.transactionService.getTransactions(pageIndex, this.pageSize)
      .subscribe(transactions => {
        this.transactions = transactions;
        this.isLoading = false;
        // If your service supports total count, update totalTransactions here
      });
  }

  goToPage(n: number): void {
    this.currentPage = n;
    this.loadTransactions();
  }

  onNext(): void {
    this.goToPage(this.currentPage + 1);
  }

  onPrev(): void {
    this.goToPage(this.currentPage - 1);
  }

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // In your parent component, e.g., transactions-page.component.ts

  handleCreateTransaction(newTransaction: any) {
    this.transactionService.addTransaction(newTransaction);
    this.loadTransactions(); // Reload your transactions list
    this.currentPage = 1; // Reset to the first page to show the newly added transaction
    this.closeModal();
    this.loadTransactions();
  }
}