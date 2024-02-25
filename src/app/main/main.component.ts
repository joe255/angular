import { Component } from '@angular/core';
import { HeadlineComponent } from '../headline/headline.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeadlineComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  
}
