import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface Transaction {
  id: number;
  date: string;
  amount: number;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactions: Transaction[] = [];

  constructor() {
    // Populate the transactions with mock data for demonstration
    for (let i = 0; i < 105; i++) {
      this.transactions.push({
        id: i + 1,
        date: `2024-02-${i % 30 + 1}`,
        amount: Math.floor(Math.random() * 2000) - 1000,
        description: `Transaction ${i + 1}`,
      });
    }
  }
  getTransactions(page: number, pageSize: number, isPrefetch: boolean = false): Observable<Transaction[]> {
    const cacheKey = `transactions-page-${page}`;
    console.log("loading " + cacheKey);
    
    // Attempt to get cached data from session storage
    const cachedData = sessionStorage.getItem(cacheKey);
    console.log(cachedData);
    if (cachedData) {
      if (!isPrefetch) { // Only prefetch if this is not a prefetch operation
        this.prefetchAdjacentPages(page, pageSize).catch(error => console.error("Background operation failed:", error));
      }
      return of(JSON.parse(cachedData));
    }
  
    // If not in cache, fetch data, then cache
    return of(this.transactions.slice((page - 1) * pageSize, page * pageSize)).pipe(
      delay(1000), // Simulate network delay
      map(data => {
        // Cache the current page in session storage
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
  
        if (!isPrefetch) { // Only prefetch if this is not a prefetch operation
          this.prefetchAdjacentPages(page, pageSize).catch(error => console.error("Background operation failed:", error));
        }
        return data;
      })
    );
  }

  private async prefetchAdjacentPages(page: number, pageSize: number) {
    const nextPage = page + 1;
  
    // Execute the prefetch in the background without waiting for it to complete
    this.getTransactions(nextPage, pageSize, true).subscribe(
      data => console.log(`Prefetched page ${nextPage}:`, data),
      error => console.error(`Error prefetching page ${nextPage}:`, error)
    );
  }
  

  addTransaction(newTransaction: Transaction) {
    // Generate a new ID for the new transaction. This assumes IDs are numeric and sequential.
    // Adjust this logic based on how you want to generate IDs.
    const newId = this.transactions.length > 0 ? Math.max(...this.transactions.map(t => t.id)) + 1 : 1;
    newTransaction.id = newId;

    // Prepend the new transaction to the start of the list
    this.transactions.unshift(newTransaction);

    // Invalidate or update the cache for the first page in session storage
    // If you're adding directly and want to keep the cache accurate, you'll need to re-cache the first page
    // and potentially adjust other cached pages. For simplicity, you might choose to invalidate the cache.
    this.invalidateCache();
  }

  private invalidateCache() {
    // Example: Invalidate the entire cache. You could also choose to only update specific keys.
    // This approach removes all transaction-related data from session storage.
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith('transactions-page-')) {
        sessionStorage.removeItem(key);
      }
    });

    // Optionally, re-cache the first page immediately. Adjust pageSize as needed.
    const pageSize = 10; // Assuming your page size is 10
    const firstPageData = this.transactions.slice(0, pageSize);
    sessionStorage.setItem('transactions-page-1', JSON.stringify(firstPageData));
  }

}
