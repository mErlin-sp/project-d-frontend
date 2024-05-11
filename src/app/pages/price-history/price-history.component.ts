import { Component } from '@angular/core';
import {HomeButtonComponent} from "../../shared/home-button/home-button.component";

@Component({
  selector: 'app-price-history',
  standalone: true,
  imports: [
    HomeButtonComponent
  ],
  templateUrl: './price-history.component.html',
  styleUrl: './price-history.component.scss'
})
export class PriceHistoryComponent {

}
