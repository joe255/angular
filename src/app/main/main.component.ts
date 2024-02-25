import { Component } from '@angular/core';
import { HeadlineComponent } from '../headline/headline.component';
import { TransactionPageComponent } from '../transaction-page/transaction-page.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeadlineComponent, TransactionPageComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  
}
