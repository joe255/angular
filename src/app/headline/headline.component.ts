import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.css',
  imports: [CommonModule],
  standalone: true,
})
export class HeadlineComponent {
  @Input()
  tenant: String = "bawag";

  getColor(): String {
    if (this.tenant === "bawag") {
      return "red";
    } 
    return "green"
  }
}
